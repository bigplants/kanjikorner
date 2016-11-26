#profile
from django.conf.urls import patterns, url

from flashcard import views

urlpatterns =[ 
#url takes four arguments - regex (searches for matching term), view, kwargs, name (naming urls)
    url(r'^(?P<full_name>\w*)/(?P<set_name>[-\w ]+)/practice$', views.practice_stack, name='practice-stack'),
    url(r'^(?P<full_name>\w*)/(?P<set_name>[-\w ]+)/complete-stack$', views.complete_stack, name='complete-stack'),
    url(r'^(?P<full_name>\w*)/SRS-review$', views.srs_review_words, name='srs_review_words'),
    url(r'^(?P<full_name>\w*)/tier-level-update$', views.tier_level_update, name='tier_level_update'),
    url(r'^lvl-(\d{1,3})/(\d{1,2})$', views.view_review_deck, name='view-review-deck'),
]   
