from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^add_record$', views.add_record, name='add_record'),
    url(r'^delete_record$', views.delete_record, name='delete_record'),
    url(r'^update_item$', views.update_item, name='update_item'),
    url(r'^search$', views.search, name='search'),
]
