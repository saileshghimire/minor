from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import *
from .forms import *
import json

import random
from faker import Faker
faker = Faker()



# Create your views here.
def home(request):
    # return HttpResponse("Homepage")
    return render(request, 'exams/home.html')


def CreateUser(request):
    form = CreateUserForm()
    if request.method =='POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('studentlogin')
    return render(request,'exams/studentsignup.html',{'form':form})
    

def studentlogin(request):
    if request.method == "POST":
        username=request.POST.get('username')
        password=request.POST.get('password')
        user=authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            messages.success(request,"You are logged in")
            return redirect('/')
        else:
            messages.error(request,"Invalid username or password")
    context={}
    return render(request,'exams/studentlogin.html',context)


def makeQuestion(request):
    if request.method == 'POST':
        qn_form = request.POST.get('question')
        opt1 = request.POST.get('option1')
        opt2 = request.POST.get('option2')
        opt3 = request.POST.get('option3')
        opt4 = request.POST.get('option4')
        level = request.POST.get('level')
        subject = request.POST.get('subject')
        correct_form = opt1
        option = [opt1, opt2, opt3, opt4]

        print(qn_form,opt1,opt2,opt3,opt4,option,correct_form,subject)

        q = Question.objects.create(question=qn_form, correct = correct_form, level=level, options = json.dumps(option))
        q.save()
        return redirect('list')
            

    return render(request, 'exams/prepareQ.html')





def listQuestion(request):    

    questions = Question.objects.all()
    jsonDec = json.decoder.JSONDecoder()
    return render(request,'exams/listQ.html',{'questions':questions})


def make_100_question():
    for i in range(100):
        qn_form = faker.sentence()
        opt1 = faker.word()
        opt2 = faker.word()
        opt3 = faker.word()
        opt4 = faker.word()
        level = random.choice(['E','M','H'])

        correct_form = opt1
        option = [opt1, opt2, opt3, opt4]
        subject=Subject.objects.get(id=1)
        print(qn_form,opt1,opt2,opt3,opt4,option,correct_form,subject,level,"/n")

        q = Question.objects.create(question=qn_form, correct = correct_form, level=level, options = json.dumps(option),subject=subject)
        q.save()

    return redirect('list')


def fakequestion(request):
    make_100_question()
    return redirect('list')



def calculate_marks(request):
    if request.method == 'POST':
        questions = Question.objects.all()  
        total_marks = 0

        for question in questions:
            level = question.level
            answer = request.POST.get('answer{}'.format(question.id))
            if level=='E':
                if answer == question.correct:
                    total_marks += 1
            elif level=='M':
                if answer == question.correct:
                    total_marks += 2
            else:
                if answer == question.correct:
                    total_marks += 3



        return render(request, 'exams/result.html', {'total_marks': total_marks})

    return render(request, 'exams/exam.html', {'questions': questions})



def examquestion(request):
    easy = Question.objects.filter(level='E').order_by('?')[:25]
    medium = Question.objects.filter(level='M').order_by('?')[:15]
    hard = Question.objects.filter(level='H').order_by('?')[:10]

    allQuestions = easy | medium | hard


    return render(request,'exams/exam.html',{'questions':allQuestions})



def noticeboard(request):
    notices = NoticeBoard.objects.all()

    return render(request,'exams/notices.html',{'notices':notices})



def notice(request,id):
    notice = NoticeBoard.objects.get(id=id)
    return render(request,'exams/notice.html', {'notice':notice})

























# API VIEW

from .serializers import QuestionSerializer
from exam.models import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


@api_view(["GET"])
def api_list(request, *args, **kwargs):
    all_api_urls = {
        "List": "/api/list/",
        "Detail View": "/api/detail/<str:pk>/",
        "Create": "/api/create/",
        "Update": "/api/update/<str:pk>/",
        "Delete": "/api/delete/<str:pk>/",
    }
    return Response(all_api_urls)


@api_view(["GET","POST"])
def api_home(request, *args, **kwargs):

    instance = Question.objects.order_by("?").first()
    data = {}
    if instance:
        data = QuestionSerializer(instance).data
        
    return Response(data) 


# class QuestionAPIView(generics.RetrieveAPIView):
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer
#     #it has pk as lookup field

# # question_view = QuestionAPIView.as_view()


# class QuestionListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Question.objects.all()
#     print(queryset)
#     serializer_class = QuestionSerializer

#     def perform_create(self, serializer):
#         # serializer.save(user=self.request.user)
#         serializer.save()
#         print(serializer)

def questionpaper():
    easy = Question.objects.filter(level='E').order_by('?')[:25]
    medium = Question.objects.filter(level='M').order_by('?')[:15]
    hard = Question.objects.filter(level='H').order_by('?')[:10]
    allQuestions = easy | medium | hard
    return allQuestions

exam_questions = questionpaper()



@api_view(["GET"])
def exam_paper(request):
    # allQuestions = []
    easy = Question.objects.filter(level='E').order_by('?')[:25]
    medium = Question.objects.filter(level='M').order_by('?')[:15]
    hard = Question.objects.filter(level='H').order_by('?')[:10]
    # print(easy,medium,hard)
    # allQuestions.append([easy,medium,hard])
    # print(allQuestions)
    # print("Outside function",exam_questions[3].level)
    allQuestions = easy | medium | hard
    # allQuestions = allQuestions.order_by(id)
    print(allQuestions)
    serializer = QuestionSerializer(allQuestions,many=True)
    print(serializer.data)
    return Response(serializer.data)
