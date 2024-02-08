"use strict";
const getValues = function () {
    // const targetelement = document.getElementById("form") as HTMLFormElement;
    // targetelement.addEventListener("submit", (event) => event.preventDefault());
    const totalweightinput = document.getElementById("totalweightid");
    const barbellweightinput = document.getElementById("barbellweightid");
    const kgsradioinput = document.getElementById("kgs");
    const lbsradioinput = document.getElementById("lbs");
    const weightunit = kgsradioinput.checked ? "kgs" : "lbs";
    const totalweight = totalweightinput.value;
    const barbellweight = barbellweightinput.value;
    return [weightunit, totalweight, barbellweight];
};
const calculate = function (targetweight, { unit, barbellweight, }) {
    const kgplates = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25];
    const lbplates = [55, 45, 35, 25, 10, 5, 2.5, 1, 0.5, 0.25];
    let selectedplates;
    const resultArray = {
        plates: [],
    };
    let currentweight = barbellweight;
    if (unit === "kgs") {
        selectedplates = kgplates;
    }
    else if (unit === "lbs") {
        selectedplates = lbplates;
    }
    const multiplier = 2;
    selectedplates.forEach((singleplate) => {
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
    return resultArray.plates;
};
const renderOutput = function (weightdObject, unit) {
    const ul = document.getElementById("weightsul");
    ul.innerHTML = "";
    weightdObject.map((item) => {
        if (unit === "kgs") {
            for (let index = 0; index < item.qty; index++) {
                const li = document.createElement("li");
                if (item.singleplate === 2.5) {
                    li.classList.add(`class2point5kg`);
                }
                else if (item.singleplate === 1.25) {
                    li.classList.add(`class1point25kg`);
                }
                else if (item.singleplate === 0.5) {
                    li.classList.add(`class0point5kg`);
                }
                else if (item.singleplate === 0.25) {
                    li.classList.add(`class0point25kg`);
                }
                else {
                    li.classList.add(`class${item.singleplate}kg`);
                }
                li.textContent = `${item.singleplate}kgs`;
                ul.appendChild(li);
            }
        }
        else {
            for (let index = 0; index <= item.qty; index++) {
                const li = document.createElement("li");
                li.classList.add(`class${item.singleplate}lb`);
                li.textContent = `${item.singleplate}lbs`;
                ul.appendChild(li);
            }
        }
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
    }
    else {
        results = calculate(+totalweight, {
            unit: "lbs",
            barbellweight: +barbellweight,
        });
        console.log(results);
        renderOutput(results, "lbs");
    }
};
window.addEventListener("DOMContentLoaded", (event) => {
    const targetelement = document.getElementById("form");
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
//# sourceMappingURL=index.js.map