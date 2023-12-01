export default function Page() {
  const date = "12/1/2023";
  return (
    <>
      <h2 className="text-3xl font-bold">Cookie Policy</h2>
      <p className="p-4">
        Last updated <span>{date}</span>
      </p>
      <h3 className="text-lg">
        <b>AGREEMENT TO OUR LEGAL TERMS</b>
      </h3>
      <div className="p-4 font-bold italic">
        {" "}
        We do not use cookies, web beacons or other methods of tracking via
        cookie usage.
      </div>
      <div className="p-4 pt-0">
        <ul className="list-disc px-8">
          <li>
            By Using the site you agree to allowing the placement of only
            necessary cookies for proper website function
          </li>
          <li>
            By disabling cookies you agree that we cannot provide consistent
            and reliable service.
          </li>
        </ul>

        <p className=" pt-4">
          If you feel any cookies are being placed on your computer that
          involve tracking for any purposes other than necessary website
          function, contact us at:{" "}
        </p>
        <li className="list-disc ml-12 p-4">contact@bayview.dev</li>
      </div>
    </>
  );
}
