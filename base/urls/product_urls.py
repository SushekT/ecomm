from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('add/', views.createtProducts, name='createtProducts'), 
    path('upload/', views.uploadImage, name='uploadProductImage'), 

    path('<str:pk>/reviews/', views.createProductReview, name='createProductReview'),
    path('<str:pk>', views.getProduct, name='product'),
    path('top/', views.getTopProducts, name='getTopProducts'),

    path('delete/<str:pk>/', views.deleteProduct, name='deleteproduct'),
    path('edit/<str:pk>', views.editProducts, name='editProducts'),
    
]
