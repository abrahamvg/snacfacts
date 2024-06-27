export const getNutritionData = () => {
    return fetch("http://localhost:3000/nutritionData")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {   
            console.log(err);
        });
};
