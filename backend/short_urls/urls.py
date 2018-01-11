from django.conf.urls import url

from . import views

app_name = 'mobile_bg'

urlpatterns = [
    url(r'^v1/links$', views.links, name='links'),
    url(r'^v1/links/([a-z]{5,})$', views.link, name='link'),
    url(r'^v1/([a-z]{5,})$', views.link_redirect, name='link_redirect'),
]
