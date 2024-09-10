def theme(request):
    theme = request.COOKIES.get("theme", "default")
    primaryColor = request.COOKIES.get("primaryColor", "")
    return {
        "theme": theme,
        "primaryColor": primaryColor,
    }
