import { Suspense } from "react";
import "./styles.css";

export default async function Page() {
  const date = "11/15/2023";

  const toc = [
    "WHAT INFORMATION DO WE COLLECT?",
    "HOW DO WE PROCESS YOUR INFORMATION?",
    "WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?",
    "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    "IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?",
    "HOW LONG DO WE KEEP YOUR INFORMATION?",
    "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    "DO WE COLLECT INFORMATION FROM MINORS?",
    "WHAT ARE YOUR PRIVACY RIGHTS?",
    "CONTROLS FOR DO-NOT-TRACK FEATURES",
    "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    "DO WE MAKE UPDATES TO THIS NOTICE?",
    "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h2 className="text-3xl">
        <b>Privacy Notice</b>
      </h2>
      <div></div>
      <p className="p-4">
        Last updated <span>{date}</span>
      </p>
      <div></div>
      <h3 className="text-lg">
        <b>AGREEMENT TO OUR LEGAL TERMS</b>
      </h3>
      <p className="p-4 pb-0">
        This privacy notice for __________ (&quot;<b>we</b>,&quot; &quot;
        <b>us</b>,&quot; or &quot;<b>our</b>&quot;), describes how and why
        we might collect, store, use, and/or share (&quot;<b>process</b>
        &quot;) your information when you use our services (&quot;
        <b>Services</b>&quot;), such as when you:
      </p>

      <ol className="list-disc p-4 pl-12">
        <li>
          Visit our website at <a href="/">https://bayview.dev</a>, or any
          website of ours that links to this privacy notice
        </li>
        <li>
          Engage with us in other related ways, including any sales,
          marketing, or events
        </li>
      </ol>

      <section className="summary p-4">
        <p>
          Questions or concerns? Reading this privacy notice will help you
          understand your privacy rights and choices. If you do not agree
          with our policies and practices, please do not use our Services.
        </p>

        <h2>SUMMARY OF KEY POINTS</h2>

        <p>
          <b className="italic">
            This summary provides key points from our privacy notice, but
            you can find out more details about any of these topics by
            clicking the link following each key point or by using our{" "}
            <a className="text-blue-500" href="#toc">
              table of contents below to find the section you are looking
              for.
            </a>
          </b>
        </p>
        <p>
          <b>What personal information do we process?</b> When you visit,
          use, or navigate our Services, we may process personal information
          depending on how you interact with us and the Services, the
          choices you make, and the products and features you use. Learn
          more about{" "}
          <a
            className="text-blue-500"
            href="#-what%20information%20do%20we%20collect?"
          >
            personal information you disclose to us.
          </a>
        </p>
        <p>
          <b>Do we process any sensitive personal information?</b> We do not
          process sensitive personal information.
        </p>
        <p>
          <b>Do we receive any information from third parties?</b> We do not
          receive any information from third parties.
        </p>
        <p>
          <b>How do we process your information?</b> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to
          comply with law. We may also process your information for other
          purposes with your consent. We process your information only when
          we have a valid legal reason to do so. Learn more about{" "}
          <a
            className="text-blue-500"
            href="#-how%20do%20we%20process%20your%20information?"
          >
            how we process your information.
          </a>
        </p>
        <p>
          <b>
            In what situations and with which parties do we share personal
            information?
          </b>{" "}
          We may share information in specific situations and with specific
          third parties. Learn more about{" "}
          <a
            className="text-blue-500"
            href="#-when%20and%20with%20whom%20do%20we%20share%20your%20personal%20information?"
          >
            when and with whom we share your personal information.
          </a>
        </p>
        <p>
          <b>How do we keep your information safe?</b> We have
          organizational and technical processes and procedures in place to
          protect your personal information. However, no electronic
          transmission over the internet or information storage technology
          can be guaranteed to be 100% secure, so we cannot promise or
          guarantee that hackers, cybercriminals, or other unauthorized
          third parties will not be able to defeat our security and
          improperly collect, access, steal, or modify your information.
          Learn more about{" "}
          <a
            className="text-blue-500"
            href="#-how%20do%20we%20keep%20your%20information%20safe?"
          >
            how we keep your information safe
          </a>
          .
        </p>
        <p>
          <b>What are your rights?</b> Depending on where you are located
          geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Learn more
          about{" "}
          <a
            className="text-blue-500"
            href="#-what%20are%20your%20privacy%20rights?"
          >
            your privacy rights
          </a>
          .
        </p>
        <p>
          <b>How do you exercise your rights?</b> The easiest way to
          exercise your rights is by submitting a{" "}
          <a
            className="text-blue-500"
            href="#-how%20can%20you%20review,%20update,%20or%20delete%20the%20data%20we%20collect%20from%20you?"
          >
            data subject access request
          </a>
          , or by contacting us. We will consider and act upon any request
          in accordance with applicable data protection laws.
        </p>
        <p>
          Want to learn more about what we do with any information we
          collect?{" "}
          <a className="text-blue-500" href="#toc">
            Review the privacy notice in full.
          </a>
        </p>
      </section>
      <section className="toc">
        <h2>TABLE OF CONTENTS</h2>
        <ol className="list-decimal p-4 pl-12" id="toc">
          {toc.map((title, i) => (
            <li key={i} className="text-blue-500">
              <a
                href={`#${title
                  .toLocaleLowerCase()
                  .replace(/[ ,?]*/, "-")}`}
              >
                {title}
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section>
        {Panels.map((panel, i) => (
          <span
            key={i}
            id={toc[i].toLocaleLowerCase().replace(/[ ,?]*/, "-")}
          >
            {panel}
          </span>
        ))}
      </section>
    </Suspense>
  );
}

const Panels = [
  <>
    <b>
      <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b> We collect personal information that you provide to
        us.
      </p>
      <p className="mb-3">
        <b>Personal information you disclose to us</b>
      </p>
      <p className="mb-5">
        We collect personal information that you voluntarily provide to us
        when you register on the Services, express an interest in obtaining
        information about us or our products and Services, when you
        participate in activities on the Services, or otherwise when you
        contact us.
      </p>
      <b>Personal Information Provided by You.</b> The personal information
      that we collect depends on the context of your interactions with us
      and the Services, the choices you make, and the products and features
      you use. The personal information we collect may include the
      following:
      <ul className="list-disc p-4 pl-12">
        <li>names</li>
        <li>phone numbers</li>
        <li>email addresses</li>
        <li>usernames</li>
        <li>passwords</li>
        <li>contact preferences</li>
      </ul>
      <p className="mb-3">
        <b>Sensitive Information.</b> We do not process sensitive
        information.
      </p>
      <p className="mb-3">
        <b>Social Media Login Data.</b> We may provide you with the option
        to register with us using your existing social media account
        details, like your Facebook, Twitter, or other social media account.
        If you choose to register in this way, we will collect the
        information described in the section called{" "}
        <a
          className="text-blue-500"
          href="#-how do we handle your social logins?"
        >
          &quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&quot;
        </a>{" "}
        below.
      </p>
      <p>
        All personal information that you provide to us must be true,
        complete, and accurate, and you must notify us of any changes to
        such personal information.
      </p>
    </div>
  </>,
  <>
    <h2>
      <b>2. HOW DO WE PROCESS YOUR INFORMATION?</b>
    </h2>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b>
        We process your information to provide, improve, and administer our
        Services, communicate with you, for security and fraud prevention,
        and to comply with law. We may also process your information for
        other purposes with your consent.
      </p>

      <b>
        We process your personal information for a variety of reasons,
        depending on how you interact with our Services, including:
      </b>
      <ul className="list-disc pl-12">
        <li className="mt-4">
          <b>
            To facilitate account creation and authentication and otherwise
            manage user accounts.
          </b>
          We may process your information so you can create and log in to
          your account, as well as keep your account in working order.
        </li>
        <li className="mt-2">
          <b>To request feedback.</b>
          We may process your information when necessary to request feedback
          and to contact you about your use of our Services.
        </li>
        <li className="mt-2">
          <b>To protect our Services.</b>
          We may process your information as part of our efforts to keep our
          Services safe and secure, including fraud monitoring and
          prevention.
        </li>
        <li className="mt-2">
          <b>To save or protect an individual&apos;s vital interest.</b>
          We may process your information when necessary to save or protect
          an individuals vital interest, such as to prevent harm.
        </li>
      </ul>
    </div>
  </>,
  <>
    <h2>
      <b>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</b>
    </h2>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b>
        We only process your personal information when we believe it is
        necessary and we have a valid legal reason (i.e., legal basis) to do
        so under applicable law, like with your consent, to comply with
        laws, to provide you with services to enter into or fulfill our
        contractual obligations, to protect your rights, or to fulfill our
        legitimate business interests.
      </p>
      <p className="mb-5">
        <b className="italic underline">
          If you are located in the EU or UK, this section applies to you.{" "}
        </b>
      </p>
      <p>
        The General Data Protection Regulation (GDPR) and UK GDPR require us
        to explain the valid legal bases we rely on in order to process your
        personal information. As such, we may rely on the following legal
        bases to process your personal information:
      </p>{" "}
      <ul className="p-4 pl-12 list-disc">
        <li className="mb-3">
          <b>Consent.</b> We may process your information if you have given
          us permission (i.e., consent) to use your personal information for
          a specific purpose. You can withdraw your consent at any time.
          Learn more about{" "}
          <a className="text-blue-500" href="/policies/data/request">
            withdrawing your consent
          </a>
          .
        </li>
        <li className="mb-3">
          <b>Legitimate Interests. </b>
          We may process your information when we believe it is reasonably
          necessary to achieve our legitimate business interests and those
          interests do not outweigh your interests and fundamental rights
          and freedoms. For example, we may process your personal
          information for some of the purposes described in order to:
          <ul className="p-4 pl-8 list-disc">
            <li className="mb-2">
              Diagnose problems and/or prevent fraudulent activities
            </li>
            <li>
              Understand how our users use our products and services so we
              can improve user experience
            </li>
          </ul>
        </li>
        <li className="mb-3">
          <b>Legal Obligations. </b>
          We may process your information where we believe it is necessary
          for compliance with our legal obligations, such as to cooperate
          with a law enforcement body or regulatory agency, exercise or
          defend our legal rights, or disclose your information as evidence
          in litigation in which we are involved.
        </li>
        <li className="mb-3">
          <b> Vital Interests. </b>
          We may process your information where we believe it is necessary
          to protect your vital interests or the vital interests of a third
          party, such as situations involving potential threats to the
          safety of any person.
        </li>
      </ul>
      <p className="mb-5">
        <b className="italic underline">
          If you are located in Canada, this section applies to you.
        </b>
      </p>
      <p className="mb-5">
        We may process your information if you have given us specific
        permission (i.e., express consent) to use your personal information
        for a specific purpose, or in situations where your permission can
        be inferred (i.e., implied consent). You can withdraw your consent
        at any time.
      </p>
      <p>
        In some exceptional cases, we may be legally permitted under
        applicable law to process your information without your consent,
        including, for example:
      </p>
      <ul className="list-disc p-4 pl-12">
        <li className="mb-2">
          If collection is clearly in the interests of an individual and
          consent cannot be obtained in a timely way
        </li>
        <li className="mb-2">
          {" "}
          For investigations and fraud detection and prevention
        </li>
        <li className="mb-2">
          For business transactions provided certain conditions are met{" "}
        </li>
        <li className="mb-2">
          If it is contained in a witness statement and the collection is
          necessary to assess, process, or settle an insurance claim
        </li>
        <li className="mb-2">
          For identifying injured, ill, or deceased persons and
          communicating with next of kin{" "}
        </li>
        <li className="mb-2">
          If we have reasonable grounds to believe an individual has been,
          is, or may be victim of financial abuse{" "}
        </li>
        <li className="mb-2">
          {" "}
          If it is reasonable to expect collection and use with consent
          would compromise the availability or the accuracy of the
          information and the collection is reasonable for purposes related
          to investigating a breach of an agreement or a contravention of
          the laws of Canada or a province
        </li>
        <li className="mb-2">
          If disclosure is required to comply with a subpoena, warrant,
          court order, or rules of the court relating to the production of
          records{" "}
        </li>
        <li className="mb-2">
          If it was produced by an individual in the course of their
          employment, business, or profession and the collection is
          consistent with the purposes for which the information was
          produced{" "}
        </li>
        <li className="mb-2">
          If the collection is solely for journalistic, artistic, or
          literary purposes{" "}
        </li>
        <li className="mb-2">
          If the information is publicly available and is specified by the
          regulations
        </li>
      </ul>
    </div>
  </>,
  <>
    <b>
      <h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
    </b>
    <div className="p-4">
      <p className="italic  mb-5">
        <b>In Short: </b>
        We may share information in specific situations described in this
        section and/or with the following third parties.
      </p>
      <div>
        <p>
          We may need to share your personal information in the following
          situations:
        </p>
        <ul className="list-disc p-4 pl-12">
          <li>
            <b>Business Transfers.</b> We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all
            or a portion of our business to another company.
          </li>
        </ul>
      </div>
    </div>
  </>,
  <>
    <b>
      <h2>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
    </b>

    <p className="italic  p-4">
      We do not use cookies or any other tracking technologies to collect
      and store your information.
    </p>
  </>,
  <>
    <b>
      <h2> 6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
    </b>
    <div className="p-4">
      <p className="italic  mb-5">
        <b>In Short: </b>
        If you choose to register or log in to our Services using a social
        media account, we may have access to certain information about you.
      </p>
      <p className="mb-3">
        Our Services offer you the ability to register and log in using your
        third-party social media account details (like your Facebook or
        Twitter logins). Where you choose to do this, we will receive
        certain profile information about you from your social media
        provider. The profile information we receive may vary depending on
        the social media provider concerned, but will often include your
        name, email address, friends list, and profile picture, as well as
        other information you choose to make public on such a social media
        platform.
      </p>
      <p className="mb-3">
        We will use the information we receive only for the purposes that
        are described in this privacy notice or that are otherwise made
        clear to you on the relevant Services. Please note that we do not
        control, and are not responsible for, other uses of your personal
        information by your third-party social media provider. We recommend
        that you review their privacy notice to understand how they collect,
        use, and share your personal information, and how you can set your
        privacy preferences on their sites and apps.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>7. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
    </b>
    <div className="p-4">
      <p className="italic  mb-5">
        <b>In Short:</b>
        We may transfer, store, and process your information in countries
        other than your own.
      </p>
      <p className="mb-3">
        Our servers are located in The United States of America. If you are
        accessing our Services from outside, please be aware that your
        information may be transferred to, stored, and processed by us in
        our facilities and by those third parties with whom we may share
        your personal information (see{" "}
        <a
          className="text-blue-500"
          href="#-when and with whom do we share your personal information?"
        >
          &quot;WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
          INFORMATION?&quot;
        </a>{" "}
        above), in and other countries.
      </p>
      <p>
        If you are a resident in the European Economic Area (EEA), United
        Kingdom (UK), or Switzerland, then these countries may not
        necessarily have data protection laws or other similar laws as
        comprehensive as those in your country. However, we will take all
        necessary measures to protect your personal information in
        accordance with this privacy notice and applicable law.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>8. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b>
        We keep your information for as long as necessary to fulfill the
        purposes outlined in this privacy notice unless otherwise required
        by law.
      </p>
      <p className="mb-3">
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this privacy notice, unless a
        longer retention period is required or permitted by law (such as
        tax, accounting, or other legal requirements). No purpose in this
        notice will require us keeping your personal information for longer
        than the period of time in which users have an account with us.
      </p>
      <p className="mb-3">
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize such
        information, or, if this is not possible (for example, because your
        personal information has been stored in backup archives), then we
        will securely store your personal information and isolate it from
        any further processing until deletion is possible.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>9. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b>
        We aim to protect your personal information through a system of
        organizational and technical security measures.
      </p>
      <p className="mb-3">
        We have implemented appropriate and reasonable technical and
        organizational security measures designed to protect the security of
        any personal information we process. However, despite our safeguards
        and efforts to secure your information, no electronic transmission
        over the Internet or information storage technology can be
        guaranteed to be 100% secure, so we cannot promise or guarantee that
        hackers, cybercriminals, or other unauthorized third parties will
        not be able to defeat our security and improperly collect, access,
        steal, or modify your information. Although we will do our best to
        protect your personal information, transmission of personal
        information to and from our Services is at your own risk. You should
        only access the Services within a secure environment.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>10. DO WE COLLECT INFORMATION FROM MINORS?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b>
        We do not knowingly collect data from or market to children under 18
        years of age.
      </p>
      <p className="mb-3">
        We do not knowingly solicit data from or market to children under 18
        years of age. By using the Services, you represent that you are at
        least 18 or that you are the parent or guardian of such a minor and
        consent to such minor dependent&apos;s use of the Services. If we
        learn that personal information from users less than 18 years of age
        has been collected, we will deactivate the account and take
        reasonable measures to promptly delete such data from our records.
        If you become aware of any data we may have collected from children
        under age 18, please contact us at{" "}
        <a className="text-blue-500" href="mailto:contact@bayview.dev">
          contact@bayview.dev
        </a>
        .
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>11. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short: </b>
        In some regions, such as the European Economic Area (EEA), United
        Kingdom (UK), Switzerland, and Canada, you have rights that allow
        you greater access to and control over your personal information.
        You may review, change, or terminate your account at any time.
      </p>
      <p className="mb-3">
        In some regions (like the EEA, UK, Switzerland, and Canada), you
        have certain rights under applicable data protection laws. These may
        include the right (i) to request access and obtain a copy of your
        personal information, (ii) to request rectification or erasure;
        (iii) to restrict the processing of your personal information; (iv)
        if applicable, to data portability; and (v) not to be subject to
        automated decision-making. In certain circumstances, you may also
        have the right to object to the processing of your personal
        information. You can make such a request by contacting us by using
        the contact details provided in the section{" "}
        <a
          className="text-blue-500"
          href="#-how can you contact us about this notice?"
        >
          &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
        </a>{" "}
        below.
      </p>
      <p className="mb-5">
        We will consider and act upon any request in accordance with
        applicable data protection laws.
      </p>
      <p className="mb-5">
        If you are located in the EEA or UK and you believe we are
        unlawfully processing your personal information, you also have the
        right to complain to your{" "}
        <a
          className="text-blue-500"
          href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
        >
          Member State data protection authority or UK data protection
          authority.
        </a>
      </p>
      <p className="mb-5">
        If you are located in Switzerland, you may contact the{" "}
        <a
          className="text-blue-500"
          href="https://www.edoeb.admin.ch/edoeb/en/home.html"
        >
          Federal Data Protection and Information Commissioner.
        </a>
      </p>
      <p className="mb-3">
        <b className="underline">Withdrawing your consent</b>: If we are
        relying on your consent to process your personal information, which
        may be express and/or implied consent depending on the applicable
        law, you have the right to withdraw your consent at any time. You
        can withdraw your consent at any time by contacting us by using the
        contact details provided in the section{" "}
        <a
          className="text-blue-500"
          href="#-how can you contact us about this notice?"
        >
          &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
        </a>{" "}
        below.
      </p>
      <p className="mb-5">
        However, please note that this will not affect the lawfulness of the
        processing before its withdrawal nor, when applicable law allows,
        will it affect the processing of your personal information conducted
        in reliance on lawful processing grounds other than consent.
      </p>
      <h2 className="mb-3">
        <b>Account Information</b>
      </h2>
      <p>
        If you would at any time like to review or change the information in
        your account or terminate your account, you can:
      </p>
      <ol className="list-disc p-4 pl-12">
        <li className="mb-2">
          Log in to your account settings and update your user account.
        </li>
        <li>Contact us using the contact information provided.</li>
      </ol>
      <p className="mb-5">
        Upon your request to terminate your account, we will deactivate or
        delete your account and information from our active databases.
        However, we may retain some information in our files to prevent
        fraud, troubleshoot problems, assist with any investigations,
        enforce our legal terms and/or comply with applicable legal
        requirements.
      </p>
      <p>
        <b className="underline">Cookies and similar technologies</b>: Most
        Web browsers are set to accept cookies by default. If you prefer,
        you can usually choose to set your browser to remove cookies and to
        reject cookies. If you choose to remove cookies or reject cookies,
        this could affect certain features or services of our Services.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>12. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
    </b>
    <p className="p-4">
      Most web browsers and some mobile operating systems and mobile
      applications include a Do-Not-Track (&quot;DNT&quot;) feature or
      setting you can activate to signal your privacy preference not to have
      data about your online browsing activities monitored and collected. At
      this stage no uniform technology standard for recognizing and
      implementing DNT signals has been finalized. As such, we do not
      currently respond to DNT browser signals or any other mechanism that
      automatically communicates your choice not to be tracked online. If a
      standard for online tracking is adopted that we must follow in the
      future, we will inform you about that practice in a revised version of
      this privacy notice.
    </p>
  </>,
  <>
    <b>
      <h2>13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b>
        If you are a resident of , you are granted specific rights regarding
        access to your personal information.
      </p>
      <p>
        <b>What categories of personal information do we collect?</b>
      </p>
      <p className="pl-4 my-3">
        We have collected the following categories of personal information
        in the past twelve (12) months:
      </p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Examples</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A. Identifiers</td>
            <td>
              Contact details, such as real name, alias, postal address,
              telephone or mobile contact number, unique personal
              identifier, online identifier, Internet Protocol address,
              email address, and account name{" "}
            </td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>
              {" "}
              B. Protected classification characteristics under state or
              federal law
            </td>
            <td> Gender and date of birth</td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>C. Commercial information</td>
            <td>
              Transaction information, purchase history, financial details,
              and payment information
            </td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>D. Biometric information</td>
            <td>Fingerprints and voiceprints</td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>E. Internet or other similar network activity</td>
            <td>
              Browsing history, search history, online behavior, interest
              data, and interactions with our and other websites,
              applications, systems, and advertisements
            </td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>F. Geolocation data</td>
            <td>Device location</td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>
              G. Audio, electronic, visual, thermal, olfactory, or similar
              information
            </td>
            <td>
              Images and audio, video or call recordings created in
              connection with our business activities
            </td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>H. Professional or employment-related information</td>
            <td>
              Business contact details in order to provide you our Services
              at a business level or job title, work history, and
              professional qualifications if you apply for a job with us
            </td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>I. Education Information</td>
            <td>Student records and directory information</td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>J. Inferences drawn from collected personal information</td>
            <td>
              Inferences drawn from any of the collected personal
              information listed above to create a profile or summary about,
              for example, an individual&apos;s preferences and
              characteristics
            </td>
            <td className="text-center">NO</td>
          </tr>
          <tr>
            <td>K. Sensitive personal Information</td>
            <td></td>
            <td className="text-center">NO</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p>
          We may also collect other personal information outside of these
          categories through instances where you interact with us in person,
          online, or by phone or mail in the context of:
        </p>
        <ol className="list-disc p-4 pl-12 mb-5">
          <li className="mb-2">
            Receiving help through our customer support channels;
          </li>
          <li className="mb-2">
            Participation in customer surveys or contests; and
          </li>
          <li>
            Facilitation in the delivery of our Services and to respond to
            your inquiries.
          </li>
        </ol>
      </div>
      <p>
        <b>How do we use and share your personal information?</b>
      </p>
      <p className="my-3 ml-4">
        Learn about how we use your personal information in the section,{" "}
        <a
          className="text-blue-500"
          href="#-how%20do%20we%20process%20your%20information?"
        >
          &quot;HOW DO WE PROCESS YOUR INFORMATION?&quot;
        </a>
      </p>
      <p>
        <b>Will your information be shared with anyone else?</b>
      </p>
      <p className="my-3 ml-4">
        We may disclose your personal information with our service providers
        pursuant to a written contract between us and each service provider.
        Learn more about how we disclose personal information to in the
        section,{" "}
        <a
          className="text-blue-500"
          href="#-when and with whom do we share your personal information?"
        >
          &quot;WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
          INFORMATION?&quot;
        </a>
      </p>
      <p className="ml-4 mb-3">
        We may use your personal information for our own business purposes,
        such as for undertaking internal research for technological
        development and demonstration. This is not considered to be
        &quot;selling&quot; of your personal information.
      </p>
      <p className="ml-4 mb-5">
        We have not disclosed, sold, or shared any personal information to
        third parties for a business or commercial purpose in the preceding
        twelve (12) months. We will not sell or share personal information
        in the future belonging to website visitors, users, and other
        consumers.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>14. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
    </b>
    <div className="p-4">
      <p className="italic mb-5">
        <b>In Short:</b> Yes, we will update this notice as necessary to
        stay compliant with relevant laws.
      </p>
      <p>
        We may update this privacy notice from time to time. The updated
        version will be indicated by an updated &quot;Revised&quot; date and
        the updated version will be effective as soon as it is accessible.
        If we make material changes to this privacy notice, we may notify
        you either by prominently posting a notice of such changes or by
        directly sending you a notification. We encourage you to review this
        privacy notice frequently to be informed of how we are protecting
        your information.
      </p>
    </div>
  </>,
  <>
    <b>
      <h2>15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
    </b>
    <p className="p-4">
      If you have questions or comments about this notice, you may contact
      us by post at contact@heyitsmass.dev
    </p>
  </>,
  <>
    <b>
      <h2>
        16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
        YOU?
      </h2>
    </b>
    <p className="p-4">
      Based on the applicable laws of your country, you may have the right
      to request access to the personal information we collect from you,
      change that information, or delete it. To request to review, update,
      or delete your personal information, please fill out and submit a{" "}
      <a className="text-blue-500" href="/policies/data/request">
        data subject access request
      </a>
      .
    </p>
  </>
];
