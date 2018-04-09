---
title: Hello World! - A Year On.
tags:
  - Musing
category:
  - Blog
date: 2018-04-09 19:49:06
---


It just so happens to be a year since I published my first blog post - and time has flown by! Seems like a good time to reflect on how the last year has gone and what I've been working on. 
<!-- More --> 

## Blogging consistently is **hard**.. 
I knew it'd be a challenge but still completely underestimated it. There's plenty of topics I'd love to write about (Azure AI & Machine Learning, Azure Cognitive Services, Git guidance, my experience with domain driven design) but unfortunately I just havent been able to work out how to consistently tackle these and get some content in between everything else.. 

## What have I been working on? 
Been a busy year at work - what tools / technologies have I been working with? Hopefully these turn into fully fledged blog posts over the next wee while! 

### Xamarin Native
Several opportunities where a native client application was deemed a better fit than a web client - almost all of these had a requirement for offline functionality. UWP first and IOS and/or Android in future phases - although yet to do any IOS or Android implementations. 
Using MVVM Cross to help deliver this - was rough to start with (Felt like v3 was out to get us!) but future versions ( 5 & 6 ) feel much nicer to use. 

### Azure Cognitive Services
Was surprised just how easy and reliable the facial recognition service was. 
Other Azure services in this space (AI, Bot Framework) look pretty awesome too, just looking for an excuse to use them. 

### Continuous/Automated Deployment
A goal of mine this year was to really focus on my projects build/release process. Ideally fully automating the process and making sure everything was versioned nicely. I think I did pretty well here with all 3 of my major projects having a fully automated build and release process. Still need to iron out a really nice versioning scheme though - GitVersion didnt seem to work with dotnet standard! :( 

### VSTS Package Management
I've been really pushing internally to try and get more of our code shared through NuGet / NPM feeds. I've been using VSTS Package Management for this initially which has been excellent as a quick way to get up and running with a package feed. Unfortunately the licensing cost may not be feasable for the entire org but the practice of writing code modules for consumption through NuGet has been hugely beneficial to me.   

### DotNet Standard 2.0
This has really clicked with me over the last few months which is great - makes the process of sharing code modules much easier. It's now my go-to when creating new libraries. 

### Internal Organisational change
A major part of last year for me has been pushing internally to try and improve our development practices through better documentation, guidance and reusable code (this is actually what motivated me to start this blog too). This is ongoing but it feels like we're slowly getting somewhere - who knew changing how an organisation of 400+ people do work wouldnt be easy!


If you want to hear about any of the above in detail let me know and I'll focus on putting a blog post together for it!