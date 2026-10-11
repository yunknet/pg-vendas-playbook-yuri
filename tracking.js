// Keep campaign parameters through the landing page, quiz and checkout.
const campaignKeys = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid']);
const currentCampaign = new URLSearchParams(window.location.search);

function withCampaign(url) {
  const target = new URL(url, window.location.href);
  for (const [key, value] of currentCampaign) {
    if (campaignKeys.has(key.toLowerCase()) && value && !target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  }
  return target.href;
}

window.yuriWithCampaign = withCampaign;
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a.quiz-link, a[href="quiz.html"]').forEach((link) => {
    link.href = withCampaign(link.href);
  });
});

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1151746657206681');
fbq('track', 'PageView');
