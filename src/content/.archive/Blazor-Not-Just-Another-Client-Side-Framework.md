---
title:  Blazor - Not just another client side framework. 
tags: 
- Blazor
- First Look
categories:
- .NET
description: An initial look at the new experimental Blazor framework for running .NET on the client. 
date: 2018-07-22T21:34:42Z
---

Blazor - an experimental .NET web framework running C# in the client side using WebAssembly has been causing quite a stir over the last few months, those fatigued trying to keep up with JavaScript's Framework-of-the-Month have been keeping a keen eye on Blazor with the (high) hopes of being able to ditch the JavaScript world completely. 

I thought it was about time I jumped in and had a look at what it offered - so I spent an evening downloading and mucking around with the initial Blazor application template. This post covers my initial observations and thoughts while doing so and covers some simple Blazor topics such as Blazor's targets and dependencies, component functions, routing and navigation, and the component lifecycle. 

<!-- More --> 

## Setup
### Prerequisites
- Dotnet Core SDK
    - Dotnet Core 2.1.301
    - https://www.microsoft.com/net/learn/get-started/windows#install

### Install Blazor templates: 
At the time of writing the current Blazor version was 0.4.0
- Install the Blazor templates  
``` sh
dotnet new -i Microsoft.AspNetCore.Blazor.Templates::*
```

This pulls down three Blazor templates: 
1. **blazor** - A standalone Blazor client only.
2. **blazorhosted** - A Blazor client with an ASP.NET Core server. 
3. **blazorlib** - A blank library for creating Blazor components or services.

I opted to go with the Blazor Hosted template as it gives you a better picture of a full stack application. 
- Create a new Blazor app  
``` sh
dotnet new blazorhosted
```

The [Blazor docs article](https://blazor.net/docs/tutorials/build-your-first-blazor-app.html#build-components) does a pretty good job of explaining the template so I won't go into detail there - instead I'll call out some specific bits and pieces I found interesting. 

## Targets and Dependencies
The hosted template contains three projects - A client, server and shared library. As you'd expect the shared library targets .NET Standard and the ASP.NET Server targets .NET Core.

I wasn't sure what to expect with the client library but interestingly it targets .NET Standard as well and references NETStandardLibrary instead of NETCoreApp which means it's actually just a class library rather than an executable. Trying to run the client application results in an error - the same as if you try to execute a .NET Standard library directly. 

The server project references the client library as a dependency, which felt a bit backwards at first but makes sense - the server has to serve up the Blazor application in one way or another, so a dependency has to exist there. 

## Component Functions
Each component in the sample app has a `@functions` block at the bottom of each file that allows you to define the properties and functionality for that component. This is kind of convenient for small components but anything more than a function or two I think you'd quickly want this in a view model or code behind class that you could reference and test. 

Thankfully it looks like you can do this pretty easily by setting a view to **inherit** from a class which gives you that familiar MVVM feeling. I did run into two restrictions with this though: 
1. It must inherit from the `BlazorComponent` class.
2. It must have a parameterless constructor. 

So what about your DI? You can use the `[Inject]` attribute on properties to inject dependencies instead of using constructor injection. 

The other nice thing here is because your views are inheriting the code file they have access to protected properties which helps keep the public surface of your components to a minimum - although this smells a bit too if you're binding to protected properties or methods that you then can't easily call from a test. 

## Routing and Navigation
The template has some examples of basic navigation between page components but nothing passing parameters - as you'd expect this is also fairly straightforward. Using the `@page` directive you can define the routes to each component at the beginning of the component file. Optional parameters cannot be defined, but since a component can have multiple routes associated to it you can simply create two different routes, one with and one without the parameter. 

For example all of the following are valid: 
``` csharp
@page "/path"
@page "/path/{parameter}"
@page "/another/path"
```

Parameters are then defined as properties in the `@functions` block (or inherited class) and marked with the `[Parameter]` attribute. With a few conditions: 
- they share the same name as the route definition. 
- they're accessible from the view class - so private for the `@functions` block is ok, but protected at a minimum for inherited component classes. 
- Properties have to be `string` types - it doesn't look like three's any automatic type conversion yet...

``` csharp
[Parameter]
protected string parameter { get; set; }
```

One thing I noticed was that navigating to the same page with different parameters (eg from */path/4* to */path/5*) didn't trigger the OnInit method which must mean the page is initialised once and subsequent visits reuse the same page instance. An important consideration for how you store and populate page state. In the instance where you had logic to load customer details based on an id parameter wired into the OnInit method your page would likely not refresh.

Which brings me to the... 

## Component Lifecycle
The component lifecycle looks straightforward enough and allows you to hook into any stage by overriding the appropriate method. The great thing is there's synchronous and async versions of each method which gives you plenty of flexibility with the sync methods being called before their async counterparts.  

1. **OnInit{Async}** - Executes after a component has been initialised. 
1. **OnParametersSet{Async}** - Executes after the parameters from the route or the parent component have been set. A good candidate for loading data. 
1. **OnAfterRender{Async}** - Is called each time a component has finished rendering. If your component has JavaScript UI components (eg a datepicker) then this is a good place to initialise those scripts. 

There's also two methods you can override to change the default behaviour of your components: 
- **SetParameters** - Allows you to set parameters however you like. This could be a good candidate for parameter validation or type conversions. 
- **ShouldRender** - Allows you to adjust whether the component is rendered. Returning false will hide the component from the UI. 

Lastly there's disposing of components - this is handled for any class that implements `IDisposable` with the dispose method being called when the component is removed from the UI to allow you to clean up any unmanaged resources. 

## Closing thoughts

For a framework that's essentially still a big experiment it's already got a lot of bases covered. At a first glace the framework just *makes sense* - you're using familiar concepts to stitch all these things together, such as inheritance for a component code behind or using attributes to associate properties with parameters.  

One area that still has a few unknowns that I'll need to investigate more is the best way to tie in existing JavaScript tooling and components. I'm sure I'll want to bring in a CSS preprocessor pretty quickly as well as a UX framework so will be interesting to see what's really required here, or what Razor now offers in this space, if anything. 

What I'm really excited about though is the ability to reference and use any C# library on the client and server side - reusing models is a massive bonus as it simplifies the whole end to end process. I've also always found writing and running automated tests in JavaScript much more difficult than C# so being able to have your client side using the same test tools as the server side is pretty appealing. 

Looking forward to seeing how Blazor develops! 

If you're interested you can find the code I hacked around while writing this on [my Github.](https://github.com/Julian-Robinson/FirstLook-Blazor) There's not much there but may be useful. 


### References
[Blazor home](https://blazor.net/index.html)
[Blazor on Github](https://github.com/aspnet/Blazor)
[Blazor Getting Started](https://blazor.net/docs/get-started.html)
[Blazor Components](https://blazor.net/docs/components/index.html)