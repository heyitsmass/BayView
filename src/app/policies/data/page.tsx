"use server";

export default async function Page() {
  const date = "11/15/2023";

  return (
    <>
      <h2 className="text-3xl">
        <b>DISCLAIMER</b>
      </h2>
      <div></div>
      <p className="p-4">
        Last updated <span>{date}</span>
      </p>
      <h3 className="text-lg">
        <b>WEBSITE DISCLAIMER</b>
      </h3>
      <section className="p-4">
        The information provided by Bayview Development (&quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;) on https://bayview.dev (the
        &quot;Site&quot;) and our mobile application is for general
        informational purposes only. All information on the Site and our
        mobile application is provided in good faith, however we make no
        representation or warranty of any kind, express or implied,
        regarding the accuracy, adequacy, validity, reliability,
        availability, or completeness of any information on the Site or our
        mobile application. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY
        LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
        RESULT OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE
        ON ANY INFORMATION PROVIDED ON THE SITE AND OUR MOBILE APPLICATION.
        YOUR USE OF THE SITE AND OUR MOBILE APPLICATION AND YOUR RELIANCE ON
        ANY INFORMATION ON THE SITE AND OUR MOBILE APPLICATION IS SOLELY AT
        YOUR OWN RISK.
      </section>
    </>
  );
}
