from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='homepage'),
    path('prepQ', views.makeQuestion, name='prepare'),
    path('listQ',views.listQuestion, name='list'),
    path('studentlogin',views.studentlogin, name='studentlogin'),
    path('studentsignup',views.CreateUser,name='studentsignup'),
    path('fakequestion',views.fakequestion,name='fakequestion'),
    path('exam',views.examquestion,name='examquestion'),
    path('calculate-marks/', views.calculate_marks, name='calculate_marks'),
    path('notices/',views.noticeboard,name='notice'),
    path('notice/<int:id>',views.notice,name='noticeX'),






    # API
    
    path('api/', views.api_home,name='api_home' ),
    path('api/list/', views.api_list,name='api_list' ),
    path('api/exampaper/', views.exam_paper,name='exam_paper' ),
]
