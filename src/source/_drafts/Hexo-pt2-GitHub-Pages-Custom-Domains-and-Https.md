---
title: 'Hexo pt2: GitHub Pages, Custom Domains and Https'
tags:
  - Hexo
  - Blog
  - CloudFlare
category:
  - Blog
  - Hexo
---

The final touch to any online presense is a custom domain to make it look like you're taking yourself seriously. While GitHub Pages offered everything I needed to get my content online it's not the ideal link to be sharing with people, and in the age of HTTPS all the things there was a little bit more to this exercise than I anticipated. 

<!-- More --> 

## Domain Configuration
Assuming  you've purchased a domain the first step is to set up your DNS records. I wont go into this in too much detail because it varies depending on your provider but the gist is that you need to create a CNAME entry to point to your GitHub Pages site. In my case it was: 

`www.julianrobinson.nz     CNAME   julian-robinson.github.io`

While I was here I also set up a redirect for blog.julianrobinson.nz, because it's 2 less syllables, and a email redirect for contact@julianrobinson.nz to my regular email address. I didnt fancy going whole hog configuring (and paying for) Google Apps or Office365 so we'll see how this goes for now. 

## Custom Domains with GitHub Pages
Once you have your CNAME record set up you need to let GitHub know about it - if you dont do this you'll be greeted with a nice message from GitHub stating "There's no page here!".

This is pretty straight forward to do through the GitHub UI - there's a text box in your repository settings where you can enter your custom domain. Performing this steps creates a *CNAME* file in the root of your repository with a single line containing your custom domain address.
*Check out the [GitHub Pages docs](https://help.github.com/articles/adding-or-removing-a-custom-domain-for-your-github-pages-site/) for full steps.* 

This is all well and good but when deploying from Hexo behind the scenes it's doing a clean before building and then force pushing the changes back to GitHub. This means the *CNAME* file you've just created is **going to be deleted when you next deploy**. 

To resolve this just create the CNAME file in your hexo repo under the **source** folder. As seen here: 
[IMAGE]

With this step the next time you deploy Hexo will include this CNAME file and everyone's happy.

## Https

By default GitHub Pages now serves it's Pages secured by HTTPS
