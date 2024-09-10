from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib import auth, messages
from django_email_verification import send_email as verify_email
from django.core.mail import send_mail

from datetime import datetime
import time

from .objects import JOBS, EDUCATION, LANGUAGES, TOOLS, WORKFLOWS, PROJECTS, DERIVE_TEMPLATE
from .models import Reference

MY_DATA = {
    'jobs': JOBS,
    'educations': EDUCATION,
    'workflows': WORKFLOWS,
    'awards': [
        ["Eagle Scout", "Boy Scouts of America"],
        ["First Place, Region 15", "UHSAA Public Forum Debate"],
        ["First Place, AMC 12", "American Math Competition"],
        ["Sterling Scholar, Computer Tech.", "American Preparatory Academy"],
    ],
    'languages': LANGUAGES,
    'tools': TOOLS,
    'projects': PROJECTS,
}
def get_project_map():
    def proj(id_, data):
        output_data = dict()
        output_data["name"] = data["name"]
        output_data["id"] = id_
        if data["template"] is DERIVE_TEMPLATE:
            output_data["template"] = f"sections/projects/{id_}.html"
        else:
            output_data["template"] = data["template"] # Could be None
        output_data["links"] = data["links"]
        if output_data["template"] == None:
            output_data["languages"] = []
            output_data["tools"] = []
        else:
            output_data["languages"] = list(filter(
                    lambda x: "projects" in x and (id_ in x["projects"] or data["name"] in x["projects"]),
                    LANGUAGES
                ))
            output_data["tools"] = list(filter(
                    lambda x: "projects" in x and (id_ in x["projects"] or data["name"] in x["projects"]),
                    TOOLS
                ))
        output_data["time_span"] = data.get("time_span")
        return output_data
    project_map = []
    for id_, data in PROJECTS.items():
        project = proj(id_, data)
        if project["template"] is not None:
            project_map.append(project)
    return project_map


def index(request):
    return render(request, "landing/home.html", MY_DATA)

def resume(request):
    return render(request, "landing/resume.html", MY_DATA)
def resume_short(request):
    return render(request, "landing/resume_short.html", {
        **MY_DATA,
        "project_map": get_project_map(),
    })

def projects(request):
    return render(request, "landing/projects.html", {
        **MY_DATA,
        "project_map": get_project_map(),
    })

def contact(request):
    if request.POST:
        email = request.POST.get("email", None)
        name = request.POST.get("name", None)
        subject = "BCDB: " + request.POST.get("subject", None)
        message = request.POST.get("message", None)
        try:
            send_mail(
                subject,
                f"From \"{name} <{email}>\"\n\n{message}",
                "denbleyker.bennett@gmail.com",
                ["b.denbleyker@comcast.net", email],
                fail_silently=False
            )
            messages.add_message(request, messages.INFO, "Contact email sent", extra_tags="Email System")
        except:
            messages.add_message(request, messages.ERROR, "Contact email failed to send", extra_tags="Email System")
    if request.GET:
        next_url = request.GET.get("next", None)
        if next_url:
            return HttpResponseRedirect(next_url)
    return redirect("landing:home")


def login(request):
    if request.user.is_authenticated:
        return redirect("landing:home")
    context = {}
    if request.POST:
        print(request.POST)
        username = request.POST.get("username", None)
        password = request.POST.get("password", None)
        if username is not None and password is not None:
            user = auth.authenticate(request, username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect("landing:home")
            elif auth.models.User.objects.filter(username=username).exists() and not auth.models.User.objects.get(username=username).is_active:
                return redirect("landing:verify_email")
            else:
                context = {"error": "Bad credentials"}
    return render(request, "landing/login.html", context)

def logout(request):
    auth.logout(request)
    return redirect("landing:home")

def create_user(request):
    if request.user.is_authenticated:
        if request.user.is_active:
            return redirect("landing:home")
        else:
            return redirect("landing:verify_email")
    if request.POST:
        username = request.POST.get("username", None)
        password = request.POST.get("password", None)
        email = request.POST.get("email", None)
        if username is not None and password is not None and email is not None:
            user = auth.models.User.objects.create_user(username, email, password)
            user.is_active = False
            user.save()
            verify_email(user)
            auth.login(request, user)
            return redirect("landing:verify_email")
    return render(request, "landing/create_user.html", {})

def email_verification(request):
    if request.user.is_authenticated:
        return redirect("landing:login")
    context = {"error_code": 403}
    if request.POST:
        username = request.POST.get("username", None)
        email = request.POST.get("email", None)
        if username is not None or email is not None:
            rq = {}
            if username is not None:
                rq["username"] = username
                context["username"] = username
            if email is not None:
                rq["email"] = email
                context["email"] = email
            if auth.models.User.objects.filter(**rq).exists():
                user = auth.models.User.objects.filter(**rq).first()
                verify_email(user)
                context["status"] = "success"
            else:
                context["status"] = "error"
    return render(request, "landing/verify_email.html", context)

def new_reference(request):
    if not request.user.is_active:
        return redirect("landing:verify_email")
        #return error_403(request, exception="not active")
    elif not request.user.is_authenticated:
        return error_403(request, exception="not authenticated")
    elif request.user.is_staff:
        return error_403(request, exception="For the sake of your integrity, you cannot create a reference for yourself")
    if request.POST:
        name = request.POST.get("name", None)
        relation = request.POST.get("relation", None)
        reference = request.POST.get("reference", None)
        if name is not None and relation is not None and reference is not None:
            Reference.objects.update_or_create(
                user=request.user,
                defaults={
                    "name": name,
                    "relation": relation,
                    "reference": reference,
                },
            )
            return redirect("landing:references")
    form_data = {"name": "", "relation": "", "reference": "", "exists": False}
    if Reference.objects.filter(user=request.user).exists():
        ref = Reference.objects.get(user=request.user)
        form_data = {"name": ref.name, "relation": ref.relation, "reference": ref.reference, "exists": True}
    return render(request, "landing/reference.html", {"form_data": form_data})
def del_reference(request):
    if request.POST:
        ref = Reference.objects.filter(user=request.user).first()
        if ref:
            ref.delete()
    return redirect("landing:references")

def manage(request):
    if request.user.is_staff:
        if request.POST:
            pass
        return render(request, "landing/admin.html", {})
    return error_403(request, exception="not admin")

def references(request):
    references = Reference.objects.all()
    return render(request, "landing/references.html", {"references": references})


def favicon(request):
    return render(request, "landing/favicon.svg", {}, content_type="image/svg+xml")

def manifest(request):
    return render(request, "landing/manifest.json", {}, content_type="application/json")

def error_403(request, exception=None):
    if exception == "not admin":
        exception = {"code": exception, "message": "This page is for admins only"}
    elif exception == "not active":
        exception = {"code": exception, "message": "This page requires an active account, but your email is not verified"}
    elif exception == "not authenticated":
        exception = {"code": exception, "message": "This page requires an active account, but you're not logged in"}
    elif exception == "personal integrity":
        exception = {"code": exception, "message": "For the sake of personal integrity, you're not allowed to access this page"}
    elif type(exception) == str:
        exception = {"message": exception}
    return render(request, "error/403.html", {"error_code": 403, "exception": exception})
def error_403_csrf(request, *args, **kwargs):
    return render(request, "error/403_csrf.html", {"error_code": 403})
def error_404(request, exception=None):
    if exception and hasattr(exception, "args"):
        exception = exception.args[0]
    return render(request, "error/404.html", {"error_code": 404, "exception": exception})
def error_405(request):
    return render(request, "error/405.html", {"error_code": 405, "method": request.method})
def error_418(request):
    return render(request, "error/418.html", {"error_code": 418})
def error_500(request):
    return render(request, "error/500.html", {"error_code": 500})
def get_latest_error(request):
    if request.user.is_superuser:
        with open("/home/django/bcdb/info.log") as f:
            ll = f.readlines()
            error_lines = []
            for l in reversed(ll):
                error_lines.append(l)
                if l.startswith("OK: "):
                    break
            return JsonResponse("".join(reversed(error_lines)), safe=False)
    return JsonResponse("Not Superuser", safe=False)
def error_501(request, message=None): # Not implemented
    return render(request, "error/501.html", {"error_code": 501, "message": message})
