"use client";
import { useState } from "react";
import { submitDataRequest } from "./handler";
import "./styles.css";
import UserInput from "@/components/Input";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
export default function Page() {
  type Laws = "CCPA" | "GDPR" | "Other";

  const [law, setLaw] = useState("CCPA" as Laws);

  return (
    <>
      <h2 className="text-3xl">
        <b>Data Request</b>
      </h2>

      <form className="data-request-form" action={submitDataRequest}>
        <section className="p-4">
          <UserInput
            icon={{
              icon: faUser,
            }}
            label="Name"
            name="name"
            placeholder="Your Name"
          ></UserInput>
          <div></div>
          <UserInput
            icon={{
              icon: faEnvelope,
            }}
            label="Email"
            name="email"
            placeholder="Your Email"
          ></UserInput>
        </section>

        <section className="p-4 pb-0">
          <label>
            <b>You are submitting this request as</b>
          </label>
          <div className="pl-4 p-2">
            <div>
              <input type="radio" required name="who" value="1"></input>
              <label className="pl-2">
                Under penalty of perjury, I declare all the above
                information to be true and accurate.
              </label>
            </div>
            <div>
              <input type="radio" required name="who" value="2"></input>
              <label className="pl-2">
                An agent authorized by the consumer to make this request on
                their behalf.
              </label>
            </div>
          </div>
        </section>

        <section className="data-request-dropdown p-4 pb-0">
          <label>
            <b>
              Under the rights of which law are you making this request?
            </b>
          </label>
          <div></div>
          <select className="w-full h-8 px-4 text-white bg-transparent border rounded my-2">
            <option
              className="bg-zinc-800"
              onClick={() => {
                setLaw("CCPA");
              }}
            >
              CCPA
            </option>
            <option
              className="bg-zinc-800"
              onClick={() => {
                setLaw("GDPR");
              }}
            >
              GDPR
            </option>
            <option
              className="bg-zinc-800"
              onClick={() => {
                setLaw("Other");
              }}
            >
              Other
            </option>
          </select>
        </section>
        <section className="p-4">
          {law !== "Other" && (
            <>
              <label>
                <b>I am submitting a request to _________.</b>
              </label>
            </>
          )}
          {law === "CCPA" && <CCPAForm></CCPAForm>}
          {law === "GDPR" && <GDPRForm></GDPRForm>}
        </section>
        <section className="p-4 pb-0">
          <p className="pb-4">
            <b>
              Please leave details regarding your action request or
              question.
            </b>
          </p>
          <div className="p-4 w-full">
            <textarea
              placeholder="Please leave details regarding your action request or question."
              className="w-full h-32 rounded-xl bg-zinc-900 resize-none text-white p-4 placeholder:italic"
              required={law === "Other"}
              name="comments"
            ></textarea>
          </div>
        </section>
        <ConfirmationForm></ConfirmationForm>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

const ConfirmationForm = () => {
  return (
    <section className="p-4 pb-0">
      <label>
        <b>I confirm that</b>
      </label>
      <div className="p-4">
        <div>
          <input type="checkbox" required></input>
          <label className="pl-2">
            Under penalty of perjury, I declare all the above information to
            be true and accurate.
          </label>
        </div>
        <div>
          <input type="checkbox" required></input>
          <label className="pl-2">
            I understand that the deletion or restriction of my personal
            data is irreversible and may result in the termination of
            services with My Great New Website / App.
          </label>
        </div>

        <div>
          <input type="checkbox" required></input>
          <label className="pl-2">
            I understand that I will be required to validate my request by
            email, and I may be contacted in order to complete the request.
          </label>
        </div>
      </div>
    </section>
  );
};

const GDPRForm = () => {
  return (
    <section className="pl-4 py-2 pb-0">
      <div>
        <input type="radio" name="action" value="1" required></input>
        <label className="pl-2">
          Confirm that my personal information is being processed.
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="2" required></input>
        <label className="pl-2">Access my personal information.</label>
      </div>
      <div>
        <input type="radio" name="action" value="3" required></input>
        <label className="pl-2">
          Edit / correct my personal information.
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="4" required></input>
        <label className="pl-2">
          Have my personal information deleted.
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="5" required></input>
        <label className="pl-2">
          Ask a question about BayView Developments privacy policy.
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="6" required></input>
        <label className="pl-2">
          Withdraw my consent to the processing of my personal information.
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="7" disabled></input>
        <label className="pl-2">
          Deny BayView Development the right to use my personal information
          for purposes of direct marketing, including profiling. (We do not
          use your data for direct marketing.)
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="8" required></input>
        <label className="pl-2">
          Other (please specify in the comment box below)
        </label>
      </div>
    </section>
  );
};

const CCPAForm = () => {
  return (
    <section className="pl-4 py-2 pb-0">
      <div>
        <input type="radio" name="action" value="1" required></input>
        <label className="pl-2">
          Know what information is being collected from me.
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="2" required></input>
        <label className="pl-2">Have my information deleted.</label>
      </div>
      <div>
        <input
          type="radio"
          disabled
          name="action"
          value="3"
          required
        ></input>
        <label className="pl-2">
          Opt out of having my data sold to third parties. (We do not sell
          data)
        </label>
      </div>
      <div>
        <input
          type="radio"
          disabled
          name="action"
          value="4"
          required
        ></input>
        <label className="pl-2">
          Opt in to the sale of my personal data. (We do not sell data)
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="5" required></input>
        <label className="pl-2">Access my personal information.</label>
      </div>
      <div>
        <input type="radio" name="action" value="6" required></input>
        <label className="pl-2">Fix inaccurate information.</label>
      </div>
      <div>
        <input type="radio" name="action" value="7" required></input>
        <label className="pl-2">
          Receive a copy of my personal information.
        </label>
      </div>
      <div>
        <input
          type="radio"
          disabled
          name="action"
          value="8"
          required
        ></input>
        <label className="pl-2">
          Opt out of having my data shared for cross-context behavioral
          advertising. (We do not share data for targeted avertising)
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="9" required></input>
        <label className="pl-2">
          Limit the use and disclosure of my sensitive personal information
        </label>
      </div>
      <div>
        <input type="radio" name="action" value="10" required></input>
        <label className="pl-2">
          Other (please specify in the comment box below)
        </label>
      </div>
    </section>
  );
};
