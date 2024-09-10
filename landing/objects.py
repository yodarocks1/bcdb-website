import logging
logger = logging.getLogger(__name__)

def icon_from_file(name):
    with open("landing/static/icons/" + name) as f:
        content = f.read()
    return content

ICONS = {
    "OpenGL": icon_from_file("opengl_printable.html"),
    "NSIS": icon_from_file("nsis.svg"),
    "Haskell": icon_from_file("haskell.svg"),
    "Audacity": icon_from_file("audacity.svg"),
    "Django": icon_from_file("django.svg"),
    "Tensorflow": icon_from_file("tensorflow.svg"),
    "ONNX": icon_from_file("onnx.svg"),
    "NetworkX": icon_from_file("networkx.svg"),
    "GitHub": "<i class='fab fa-github'></i>",
    "Docker": "<i class='fab fa-docker'></i>",
}

JOBS = [
    {
        'template': 'sections/experience/tsl.html',
        'type': 'employment',
    },
    {
        'template': 'sections/experience/navs.html',
        'type': 'volunteer',
    },
    {
        'template': 'sections/experience/usu.html',
        'type': 'employment',
    },
    {
        'template': 'sections/experience/stp_housekeeping.html',
        'type': 'volunteer',
    },
    {
        'template': 'sections/experience/stp.html',
        'type': 'volunteer',
        'footer_template': 'sections/experience/stp_footnote.html',
    },
    {
        'template': 'sections/experience/nylt.html',
        'type': 'volunteer',
        'footer_template': 'sections/experience/nylt_explanation.html',
    },
]
EDUCATION = [
    {
        'where': "Utah State University",
        'city': "Logan, UT",
        'when': "August 2020 – May 2024",
        'whats': [
            "<strong class='text-primary'>B.S.</strong> Computer Science",
            "<strong class='text-primary'>B.S.</strong> Law & Constitutional Studies",
            "Minor: Mathematics",
            "Minor: Anticipatory Intelligence",
        ],
        'gpa': "3.66",
    },
    #{
    #    'where': "American Preparatory Academy",
    #    'city': "Draper, UT",
    #    'what': "High School Diploma",
    #    'when': "August 2016 – May 2020",
    #    'whats': [
    #        "College-Prep Liberal Arts High School",
    #    ],
    #    'gpa': "3.99",
    #},
]
LANGUAGES = [
    {
        'name': "HTML5",
        'icon': "<i class='fab fa-html5'></i>",
        'projects': [
            "bcdb",
            "pythontutor",
            "hustle",
        ],
    },
    {
        'name': "CSS3",
        'icon': "<i class='fab fa-css3-alt'></i>",
        'projects': [
            "bcdb",
            "pythontutor",
            "hustle",
        ],
    },
    {
        'name': "JavaScript",
        'icon': "<i class='fab fa-js-square'></i>",
        'projects': [
            "bcdb",
            "pythontutor",
            "hustle",
        ],
    },
    {
        'name': "Java",
        'icon': "<i class='fab fa-java'></i>",
    },
    {
        'name': "Python",
        'icon': "<i class='fab fa-python'></i>",
        'projects': [
            "bcdb",
            "pythontutor",
            "hustle",
            "verapak",
            "eran",
        ],
    },
    {
        'name': "C# / .NET",
        'icon': "<i class='fab fa-microsoft'></i>",
        'projects': [
            "3d_scene_manager",
        ],
    },
    {
        'name': "Nullsoft Scriptable Install System",
        'icon': ICONS["NSIS"],
    },
    {
        'name': "Haskell",
        'icon': ICONS["Haskell"]
    },
    {
        'name': "Vue.JS",
        'icon': "<i class='fab fa-vuejs'></i>",
    },
    {
        'name': "Bash",
        'icon': "<i class='fas fa-terminal'></i>",
    },
]
TOOLS = [
    {
        'name': "Git",
        'icon': "<i class='fab fa-git-alt'></i>",
        'projects': [
            "pythontutor",
            "3d_scene_manager",
            "verapak",
            "eran",
            "hustle",
        ],
    },
    {
        'name': "Linux",
        'icon': "<i class='fab fa-linux'></i>",
        'content': "Flavors:<ul class='fa-ul'><li><i class='fa-li fab fa-ubuntu'></i>Ubuntu</li></ul>",
    },
    {
        'name': "Audacity",
        'icon': ICONS["Audacity"],
    },
    {
        'name': "GitHub",
        'href': "https://github.com/yodarocks1",
        'icon': ICONS["GitHub"],
        'content': "<b>Username</b>: yodarocks1",
    },
    {
        'name': "Android Studio",
        'icon': '<span class="fa-layers fa-fw"><i class="fab fa-android" data-fa-transform="up-1.5"></i><span class="fa-layers-text" data-fa-transform="shrink-10 down-5">Studio</span></span>'
    },
    {
        'name': "Bootstrap",
        'icon': "<i class='fab fa-bootstrap'></i>",
        'projects': [
            "bcdb",
            "hustle",
        ],
    },
    {
        'name': "Docker",
        'href': "https://hub.docker.com/u/yodarocks1",
        'icon': ICONS["Docker"],
        'content': "<b>Username</b>: yodarocks1",
        'projects': [
            "verapak",
            "pythontutor",
            "eran",
        ],
    },
    {
        'name': "Django",
        'icon': ICONS["Django"],
        'projects': [
            "bcdb",
            "pythontutor",
            "hustle",
        ],
    },
    {
        'name': "OpenGL",
        'icon': ICONS["OpenGL"],
        'projects': [
            "3d_scene_manager",
        ],
    },
    {
        'name': "Tensorflow",
        'icon': ICONS["Tensorflow"],
        'projects': [
            "verapak",
        ],
    },
    {
        'name': "Open Neural Network Exchange (ONNX)",
        'icon': ICONS["ONNX"],
        'projects': [
            "verapak",
            "eran",
        ],
    },
    {
        'name': "NetworkX",
        'icon': ICONS["NetworkX"],
    },
]
DERIVE_TEMPLATE = object()
PROJECTS = {
    "bcdb": {
        "name": "BCDB Website",
        "template": None,
        "links": {
            "Open": "/",
            "GitHub": "https://github.com/yodarocks1/bcdb",
        },
        "time_span": "",
    },
    "pythontutor": {
        "name": "PythonTutor",
        "template": DERIVE_TEMPLATE,
        "links": {
            "Open": "/projects/pythontutor",
            "GitHub": "https://github.com/yodarocks1/pythontutor",
            "Docker": "https://hub.docker.com/r/yodarocks1/pythontutor",
        },
        "time_span": "October 2023 – December 2023",
    },
    "3d_scene_manager": {
        "name": "OpenGL 3D Scene Manager",
        "template": None,
        "links": {},
        "time_span": "",
    },
    "verapak": {
        "name": "VERAPAK",
        "template": DERIVE_TEMPLATE,
        "links": {
            "GitHub": "https://github.com/formal-verification-research/VERAPAK",
            "Docker": "https://hub.docker.com/r/yodarocks1/verapak",
        },
        "time_span": "February 2021 – May 2024",
    },
    "eran": {
        "name": "ERAN",
        "template": None,
        "links": {
            "GitHub": "https://github.com/yodarocks1/eran",
            "Docker": "https://hub.docker.com/r/yodarocks1/eran",
        },
        "time_span": "",
        "deprecated": True,
    },
    "hustle": {
        "name": "Hustle Web App",
        "template": DERIVE_TEMPLATE,
        "links": {
            "GitHub": "https://github.com/yodarocks1/3MusketeersAndARifleman",
        },
        "time_span": "",
    },
    "traffic_simulation": {
        "name": "Traffic Simulation",
        "template": DERIVE_TEMPLATE,
        "links": {
            
        },
        "time_span": "",
    },
    "graph_analysis": {
        "name": "USU Graph Analysis",
        "template": DERIVE_TEMPLATE,
        "links": {
            
        },
        "time_span": "January 2022 – May 2022",
    },
}
WORKFLOWS = [
    "Agile Development",
    "Scrum",
]

def project_to_html(project):
    if type(project) is str:
        if project in PROJECTS:
            project = PROJECTS[project]
        else:
            for p in PROJECTS.values():
                if project == p["name"]:
                    return ""
                    project = p
                    break
    if type(project) is str:
        logger.error(f"Invalid project {project}")
        return ""
    class_list = ""
    if project.get("deprecated"):
        class_list = " class='deprecated'"
    name = project["name"]
    if project["links"].get("Open"):
        name = f"<a href='{project['links']['Open']}'>{name}</a>"
    links = []
    for link_name, link in project["links"].items():
        if link_name in ICONS:
            links.append(f"<a href='{link}'>{ICONS[link_name]}</a>")
    return f"""
<li{class_list}>
    {name} {" ".join(links)}
</li>
    """
def projects_to_html(projects):
    if projects:
        return "\n".join(map(project_to_html, projects))
    else:
        return ""

def process_skills(skills):
    for skill in skills:
        if "content" in skill:
            skill["contents"] = skill["content"]
        if "projects" in skill:
            skill["projects_html"] = projects_to_html(skill["projects"])
            s = "Projects:<ul class='mb-0'>" + skill["projects_html"] + "</ul>"
            if "contents" in skill:
                skill["contents"] += "<br/><br/>" + s
            else:
                skill["contents"] = s
        if "href" in skill:
            s = f"<a href='{skill['href']}' class='float-end' aria-label='Visit {skill['name']} link'><em>Click to visit</em></a>"
            if "contents" in skill:
                if "projects" not in skill:
                    skill["contents"] += "<br/>"
                skill["contents"] += "<br/>" + s
                skill["content"] += "<br/><br/>" + s
            else:
                skill["contents"] = s
                skill["content"] += "<br/><br/>" + s
            del skill["href"]
        if "content" in skill:
            skill["content"] = skill["content"].replace("\"", "&quot;")
        if "contents" in skill:
            skill["contents"] = skill["contents"].replace("\"", "&quot;")

process_skills(LANGUAGES)
process_skills(TOOLS)

