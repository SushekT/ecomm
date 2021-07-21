from django.urls import path
from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrder, name='getOrder'),
    path('add/', views.addOrderItems, name='addOrderItems'),
    path('myOrders/', views.getMyOrder, name='getMyOrder'),

    path('<str:pk>/delivered/', views.updateOrderedToDelivered, name='updateOrderedToDelivered'),
    path('<str:pk>/', views.getOrderById, name='userOrder'),
    path('<str:pk>/pay/', views.updateOrderedToPaid, name='pay'),
]
