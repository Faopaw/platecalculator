const getValues = function (): string[] {
  // const targetelement = document.getElementById("form") as HTMLFormElement;
  // targetelement.addEventListener("submit", (event) => event.preventDefault());
  const totalweightinput = document.getElementById(
    "totalweightid"
  ) as HTMLInputElement;
  const barbellweightinput = document.getElementById(
    "barbellweightid"
  ) as HTMLInputElement;
  const kgsradioinput = document.getElementById("kgs") as HTMLInputElement;
  const lbsradioinput = document.getElementById("lbs") as HTMLInputElement;

  const weightunit = kgsradioinput.checked ? "kgs" : "lbs";
  const totalweight = totalweightinput.value;
  const barbellweight = barbellweightinput.value;

  return [weightunit, totalweight, barbellweight];
};

const calculate = function (
  targetweight: number,
  {
    unit,
    barbellweight,
  }: // returnClosest,
  {
    unit: "kgs" | "lbs";
    barbellweight: number;
    // returnClosest: boolean;
  }
): any[] {
  const kgplates = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25];
  const lbplates = [55, 45, 35, 25, 10, 5, 2.5, 1, 0.5, 0.25];
  let selectedplates: number[];
  const resultArray: { plates: any[] } = {
    plates: [],
  };
  let currentweight = barbellweight;

  if (unit === "kgs") {
    selectedplates = kgplates;
  } else if (unit === "lbs") {
    selectedplates = lbplates;
  }

  const multiplier = 2;
  selectedplates!.forEach((singleplate) => {
    if (currentweight < targetweight) {
      const testweight = singleplate;
      if (testweight <= targetweight - currentweight) {
        // do some checks then add to the array
        // How many of this plate can we add in total?
        let qty = Math.floor((targetweight - currentweight) / testweight);
        if (qty % multiplier) {
          qty -= 1;
        }
        if (qty) {
          resultArray.plates.push({
            singleplate,
            qty,
          });
        }
        // Add weight to the bar
        currentweight += testweight * qty;
      }
    }
  });
  // console.log(resultArray.plates);
  return resultArray.plates;
};

const renderOutput = function (
  weightdObject: { singleplate: any; qty: any }[],
  unit: string
): void {
  const ul = document.getElementById("weightsul") as HTMLUListElement;
  ul.innerHTML = "";
  weightdObject.map((item) => {
    const li = document.createElement("li");
    // const text = document.createTextNode(`${item.singleplate}kgs - x${item.qty}`);
    if (unit === "kgs") {
      li.textContent = `${item.singleplate}kgs - x${item.qty}`;
    } else {
      li.textContent = `${item.singleplate}lbs - x${item.qty}`;
    }
    ul.appendChild(li);
  });
};

const returnWeight = function () {
  let results;
  const [weightunit, totalweight, barbellweight] = getValues();
  if (weightunit === "kgs") {
    results = calculate(+totalweight, {
      unit: "kgs",
      barbellweight: +barbellweight,
    });
    console.log(results);
    renderOutput(results, "kgs");
    return results;
  } else {
    results = calculate(+totalweight, {
      unit: "lbs",
      barbellweight: +barbellweight,
    });
    console.log(results);
    renderOutput(results, "lbs");
    return results;
  }
};

window.addEventListener("DOMContentLoaded", (event) => {
  const targetelement = document.getElementById("form") as HTMLFormElement;
  targetelement.addEventListener("submit", (event) => {
    event.preventDefault();
    returnWeight();
  });
});

// const submitbutton = document.getElementById("submitform") as HTMLButtonElement;
// submitbutton.addEventListener("click", () => returnWeight());

// TODO: FIX the default form behaviour of resetting the page.
// TODO: FIX the eventlistener bug
// TODO: CREATE the output section of the app to display the results of the return weight function
