from django import template
import json
register = template.Library()


@register.filter(name='get_options')
def get_options(value):
    return json.loads(value)


@register.filter(name='get_level')
def get_level(value):
    if value == 'E':
        return "Marks:1"
    elif value == 'M':
        return "Marks:2"
    elif value == 'H':
        return "Marks:3"
    else:
        return 'Unknown'
    

@register.filter(name='get_subject')
def get_subject(value):
    if value==None or value=='':
        return "Minor Project"