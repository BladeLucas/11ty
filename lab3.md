---
title: Lab 3
subtitle: ServerlessFunctions /Mail Service Research
---
# {{ title }}
## {{ subtitle }}

---

## Serverless Functions
For the purposes of this assignment there was an obvious choice for serverless functions, but none the less, I will go over a few different options.

**Netlify**  
Netlify was the obvious choice for my use, as I am already hosting my 
website on Netlify. All I needed to do was go to the "Site Configuration" 
settings and enable the use of serverless functions. After the setting 
was enabled, I simply needed to write a .js file with the name of my 
function, and store it in a ./netlify/functions/ directory, giving netlify 
direct access to the function. Functions can be observed from the Logs 
setting and navigating to the functions tab, you can monitor the status 
of the function and any errors from there. Netlify's free version does 
have limitations on serverless functions of 125000 requests and or 100 
hours of runtime, resetting every month. There is a paid option to override 
this, but for the purposes I am using it for, it is not nessacary.

**Google**  
Google also has the option to create serverless functions from 
[Cloud Run Functions](https://cloud.google.com/functions?utm_source=google&utm_medium=cpc&utm_campaign=na-CA-all-en-dr-bkws-all-all-trial-e-dr-1707554&utm_content=text-ad-none-any-DEV_c-CRE_665735485592-ADGP_Hybrid+%7C+BKWS+-+MIX+%7C+Txt-Serverless+Computing-Cloud+Functions-KWID_43700077225654594-kwd-78182616746&utm_term=KW_google%20function-ST_google+function&gad_source=1&gclid=Cj0KCQiA0--6BhCBARIsADYqyL_qlFGR568KCpWYg5axIititgUM7KDnBhJaP1rpSOOVBAumijphCAYaAndcEALw_wcB&gclsrc=aw.ds). 
To use the Google cloud functions, you need to create an account and enable 
billing for your account. Upon sign up, google gives you $300 of free usage 
for your functions, but you are charged by the milliseconds used on your 
functions after that runs out. With that being said, google cloud functions 
are only free up to a certain point, then it is a paid service. You also 
require API keys to run your functions on your deployment, which is fairly 
standard, but foor my uses, it made more sense to go in a different direction, 
both for pricing and ease of use. I will say, Googles billing method is quite 
good though, you are only charged for the time your functions are actively 
used, rather than a fixed rate monthly cost, which is great for lower traffic 
sites.

**AWS**  
Amazons service for serverless functions has promise. They have many diffrent 
options for plans, several of them are free options as well. Much like Netlify, 
there are limitations to the free plans, but they range from 4000 requests 
per month to 1 million requests per month. The drawback to this though, all 
their services appear to be disconnected from one another, meaning you would 
likely need several services to serve the same functions as Google or Netlify. 
There are different plans for computing, mobile, application integration, 
front-end, back-end etc. So, while you may get many more free uses from 
Amazon as opposed to other services, it comes at the cost of simplicity and
convenience. More can be learned about the AWS Amazon services 
[here](https://aws.amazon.com/free/?gclid=Cj0KCQiA0--6BhCBARIsADYqyL_H1tHRNHV3HkBORqejE-Bm3sERkTYGAj6dG8rpXjGcmr3nzm1dsdUaAtlSEALw_wcB&trk=1b4744da-4b96-4a0b-8930-59b05a2cbf60&sc_channel=ps&ef_id=Cj0KCQiA0--6BhCBARIsADYqyL_H1tHRNHV3HkBORqejE-Bm3sERkTYGAj6dG8rpXjGcmr3nzm1dsdUaAtlSEALw_wcB:G:s&s_kwcid=AL!4422!3!686673811656!p!!g!!ms%20azure!20912185350!158492892898&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=categories%23serverless).

---

##Mail Services
**MailChimp**  
I had originally chosen MailChimp as my mail service for this Assignment, 
but after many hours of failed attempts to integrate, I realized that MailChimp 
would not be the proper choice for the scope of this assignment. What I did not 
realize, is that MailChimps email delivery system is an offshoot called 
MailChimp Mandrill, which is locked behind a paywall along with several 
other features of the service. Under the free account, you can simply set 
up a mail list, but you cannot leverage serverless functions to automatically 
send emails without access to Mandrill.

**SendGrid**  
SendGrid is another mail service that can be leveraged by serverless functions 
in order to send mail to specified addresses. They have several different 
plans available, including a free option which does include automated mail 
delivery. The free plan allows you to send 100 emails per day for free, which 
is perfect for the scope of this project, but they do have paid options up to 
$90/month where you can send up to 2.5 million emails per month, along wiht several 
other perks. SendGrid also offers a user friendly dashboard to monitor success 
vs failure rates of email sending, making things easier to troubleshoot.

---

##Assignment 3 Choices
After careful consideration, I decieded to go with Netlify for my serverless 
functions, and SendGrid for my mail service. Netlify was the obvious choice 
for me, as I am already hosting my website off Netlify, so integrating the functions 
was as easy as enabling them in the settings and creating some folders in my 
root directory. As for SendGrid, I had originally chosen MailChimp as I had 
heard about them before, but after learning about their paywall and researching 
my alternatives, SendGrid looked to be the most user friendly and also 
fit the scope of the assignment.