from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from manageset.models import UserProfile, Sets, Words, Kanji, KnownWords
from django.contrib.auth.models import User
# from django.utils import simplejson
from django.core import serializers
import json
import random
from datetime import datetime, timedelta, time
from django.template.context_processors import csrf
# import pytz
from django.utils.timezone import utc
from django.db.models import F
from django.views.decorators.cache import cache_control
from forms import WordMeaningUpdate
from django.http import JsonResponse
from api.serializers import SetsSerializer, KnownWordsSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.decorators import renderer_classes 
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response



# Create your views here.
def practice_stack(request, full_name, set_name):
    if not request.user.is_authenticated() or request.user.username != full_name:
        return HttpResponse("you are not authenticated")
    else: 
        userprofiles = User.objects.get(username = full_name).userprofile.id
        userprofile = get_object_or_404(UserProfile, pk = userprofiles)
        words = Sets.objects.get(name = set_name, userprofile = userprofiles).words.all()
        words_in_queue = KnownWords.objects.filter(user_profile = userprofile, tier_level__gte = 1).exists()
        
        kanji_names = []
        for each in words:
            
            kanji_names.append(list(each.kanji.values('kanji_name')))
            
        kanji_names = json.dumps(kanji_names)    
            
        
        return render(request, 'flashcard/practicecards.html', {'full_name':full_name, 'words':words, 'set_name': set_name, 'kanji_names': kanji_names, 'words_in_queue':words_in_queue})
        
@api_view(['GET'])
def get_review_deck(request, level, sub_level):
    deck = Sets.objects.filter(level=level, sub_level=sub_level)
    serializer = SetsSerializer(deck, many=True)
    data = serializer.data
    return Response(data)

def view_review_deck(request, level, sub_level):
    return render(request, 'flashcard/practicecards.html')

@api_view(['GET'])
def get_srs_review(request):
    profile = request.user.userprofile
    now = datetime.utcnow().replace(tzinfo=utc)
    words = KnownWords.objects.filter(user_profile = profile, tier_level__lte = 7).exclude(tier_level = 0).exclude(time_until_review = None).order_by('time_until_review').select_related('words')
    serializer = KnownWordsSerializer(words, many=True)
    data = serializer.data
    return Response(data)

def view_srs_review(request):
    return render(request, 'flashcard/practicecards.html')


def complete_stack(request, full_name, set_name):
    if not request.user.is_authenticated() or request.user.username != full_name:
        return HttpResponse("you are not authenticated")
    else:
        if request.is_ajax():
            
            try:
               
                userprofiles = User.objects.get(username = full_name).userprofile.id
                userprofile = get_object_or_404(UserProfile, pk = userprofiles)
                
                theset = request.POST['set_name']
                the_set_object = userprofile.user_sets.get(name = theset)
                if the_set_object.times_practiced == 0:
                    
                    the_set_object.times_practiced = 1
                    
                    userprofiles = User.objects.get(username = full_name).userprofile.id
                    words = request.POST['wordlist']
                    
                    data = json.loads(words)
                    
                    
                    words_practiced = []
                    
                    for each in data:  
                        
                        # this is really confusing (this is actually the id of the word, not the KnownWord Object), temporary fix so that practicecard template will work for both reviews and stacks
                        words_practiced.append(each['know_word_object_id'])
                        
                    KnownWords.objects.filter(user_profile = userprofiles, words__in = words_practiced).update(last_practiced = datetime.now(), tier_level = 1, time_until_review = timedelta(hours = 4).total_seconds())
                   
                    the_set_object.save()
                    data = json.dumps(words)
                    
                else:
                    #doesnt mean anything just to show ajax response worked
                    data = 1    
                
            except KeyError:
                return HttpResponse("there was an error")
        return HttpResponse(data, content_type="application/json")
        
        
@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def srs_review_words(request, full_name):
    if not request.user.is_authenticated() or request.user.username != full_name:
        return HttpResponse("you are not authenticated")
    else:
            words_list = srs_get_and_update(request, full_name)
    return render(request, 'flashcard/review-cards-new.html', {'full_name':full_name, 'words':words_list})
    

def srs_get_and_update(request, full_name):
    
    profile = request.user.userprofile
    now = datetime.utcnow().replace(tzinfo=utc)
    words = KnownWords.objects.filter(user_profile = profile, tier_level__lte = 7).exclude(tier_level = 0).exclude(time_until_review = None).order_by('time_until_review').select_related('words')
    words_list = []
    known_word_id = []
    difference = 0
    
    for word in words:
        last_practiced = word.last_practiced
        now = datetime.utcnow().replace(tzinfo=utc)
        difference = now - last_practiced
        difference = difference.total_seconds()

        time_remaining = word.time_until_review - difference

        if time_remaining <= 0:
            #using this so i can update right or wrong words
            #need to add normal id to put definitions etc
            word.words.known_word_id = word.id

            words_list.append(word.words)
            
    words.update(last_practiced = now,time_until_review = F('time_until_review') - difference)
            
    return words_list 



def tier_level_update(request, full_name):
  
    if not request.user.is_authenticated() or request.user.username != full_name:
        return HttpResponse("you are not authenticated")
    else:
        if request.is_ajax():
            try:

                timezone_adjustment = int(request.GET['timezone_offset'])
                known_id = request.GET['known_object_id']
                increase_level = int(request.GET['increase_level'])
                selected_word = KnownWords.objects.get(id = known_id)
                selected_word.update_tier_and_review_time(increase_level)
                selected_word.save()
                
                userprofile = request.user.userprofile
                
                userprofile.update_words_practiced_today(timezone_adjustment)
                # userprofile.words_practied_today_time_marker = datetime.now() - timedelta(hours = 7)
                userprofile.save()
                
                
                data = 1

            except KeyError:
                return HttpResponse("there was an error")
            return HttpResponse(data, content_type="application/json")




    
    


            
