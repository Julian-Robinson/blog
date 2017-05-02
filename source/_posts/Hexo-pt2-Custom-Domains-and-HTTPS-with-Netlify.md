---
title: 'Hexo pt2: Custom Domains and HTTPS with Netlify'
tags:
  - Hexo
  - Blogging
  - Netlify
category:
  - Blog
  - Hexo
description: Hosting static sites with a custom domain and https on Netlify.
date: 2017-04-14 20:17:29
---

The final touch to any online presence is a custom domain to make it look like you're taking yourself seriously. While GitHub Pages offered everything I needed to get my content online it's not the ideal link to be sharing with people and in the age of HTTPS all the things there was a little bit more to this exercise than I anticipated..

<!-- More -->

## The Problem
The original intention of this post was to describe the steps required to get my GitHub Pages hosted site configured with a custom domain and still allow it to be served over HTTPS.
Before I got too far into into this I assumed the steps would look something like this: 
1. Configure DNS records
1. Configure GitHub with custom domain
1. Hook in [Let's Encrypt](https://letsencrypt.org) somehow

By the looks of things GitHub has got a bit of a checkered history with HTTPS ([check out this open issue from 2014](https://github.com/isaacs/github/issues/156)) - GitHub now serve all it's pages over HTTPS by default, which is awesome and a step in the right direction, but support for custom domains is still a tricky issue. 
My fallback for this was to perhaps use something like CloudFlare to act as a proxy to enable TLS but all of this just didn't feel *nice*...

## Netlify
After reviewing a few other alternatives for hosting static sites [Netlify](https://www.netlify.com) stood out like a pretty good option. It's got a global CDN network, simple HTTPS configuration, automated deployment from a GitHub repository and it's also got a free tier!

### Create a new site
First step is creating a new Netlify site - a trivial process.
1. After signing in to select **Create Site**
1. Select **GitHub** as a source for Continuous Deployment 
    {% asset_img "netlify-new-site.png" "Create new site" %}
1. Grant authorization to allow Netlify to read your repos. 
1. Select your Hexo repository 
    {% asset_img "netlify-associate-repo.png" "associate your repo" %}
1. Configure your deployment settings. In this screen you can define both a **build command** and your **publish directory**. In this case I've entered
        hexo generate --config _config.deploy.yaml
    {% asset_img "netlify-configure-deployment.png" "Enter deployment settings" %}
    > The config flag is just so I can use a different configuration than locally. I also ended up having to move my source to the root directory
1. Click **Deploy Site**
    {% asset_img "site-is-live.png" "It's aaaallive!" %}

Netlify gives you a temporary name for your site, in my case **money-changer-badger-46424**. Catchy. These are easy enough to change from your site settings page. 
    {% asset_img "netlify-site-settings.png" "Netlify Site Settings" %}

Here you can change your site name to something a bit friendlier and enable your custom domain by entering it in, both of which I did. You can also enable HTTPS - But we'll come back to this because it requires having you domain DNS record set up to redirect to your Netlify site. 
This is what I was originally expecting to find in GitHub - all 3 steps in one place. 

## Domain Configuration
I wont go into this in too much detail because it varies depending on your provider but the gist is that you need to create a CNAME entry to point to your Netlify site. In my case it was: 

    www.julianrobinson.nz     CNAME   julian-robinson.netlify.com

While I was here I also set up a redirect for *blog.julianrobinson.nz*, because it's 2 less syllables, and an email redirect for *contact@julianrobinson.nz* to my regular email address. I didn't fancy going whole hog configuring (and paying for) Google Apps or Office365 so we'll see how this goes for now. 

## HTTPS
With browsers now starting to warn users when they're visiting unsecured pages I think it's important to make sure you're serving all your content securely, even if there's no credentials to leak it's just a better experience.

Netlify makes it ridiculously easy to set up. Once you've set up your domain redirection you simply hit **Enable HTTPS** from your site settings page and wait. Netlify and Let's Encrypt do their thing and in no time at all it's all sorted. 
{% asset_img "site-secure.png" "Site Secure"  %}

Netlify also gives you an option to enforce HTTPS through HSTS - nice!

## Review

On the whole setting this all up was trivially simple with Netlify. When I started investigating what I assumed was a simple task I was surprised at how many gotchas there was using GitHub Pages. Netlify delivered the experience I was expecting and massively simplified the whole process, especially deployment pipeline integrating directly with my Hexo source repository.

I also reckon the site loads even faster!

