from django.urls import path
from django.urls import path
from base.views import user_views as views


urlpatterns = [



    path('profile', views.getUser, name='userProfile'),
    path('profile/update/', views.updateUser, name='updateProfile'),
    path('register', views.registerUser, name='userRegiser'),
    path('', views.getAllUser, name='users'),

    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUserByAdmin, name='updateUserByAdmin'),

    path('delete/<str:pk>/', views.deleteUser, name='user_delete')
]
