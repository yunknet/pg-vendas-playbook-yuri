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
// Count each milestone once per page load, without quiz answers or buyer data.
const recordedMilestones = new Set();
window.yuriTrack = (name, parameters = {}) => {
  const key = name + ':' + (parameters.button_position || parameters.question_number || '');
  if (recordedMilestones.has(key)) return;
  recordedMilestones.add(key);
  try { window.fbq?.('trackCustom', name, parameters); } catch (_) { /* Navigation must remain available. */ }
};
window.yuriGoToCheckout = (url) => {
  window.yuriTrack('CheckoutClick');
  // Briefly allow the browser event to leave before external navigation.
  setTimeout(() => window.location.assign(withCampaign(url)), 200);
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a.quiz-link, a[href="quiz.html"]').forEach((link) => {
    link.href = withCampaign(link.href);
    if (document.body.classList.contains('sales-page')) {
      link.addEventListener('click', (event) => {
        window.yuriTrack('LandingCtaClick', {
          button_position: link.closest('.hero') ? 'hero' : 'final'
        });
        if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
          event.preventDefault();
          setTimeout(() => window.location.assign(link.href), 200);
        }
      });
    }
  });
  if (document.body.classList.contains('sales-page')) window.yuriTrack('LandingPageView');
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
