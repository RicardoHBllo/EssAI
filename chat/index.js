// Captura el formulario
const formulario = document.querySelector('form');
// Captura el elemento con ID "app"
const appDiv = document.getElementById("app");


const button = document.querySelector('#generarPDF');

const API_KEY = "TU_API_KEY";

function generatePDF(text) {

    // Creando una instancia de jsPDF en orientación vertical (portrait)
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11] // Tamaño estándar de la página en pulgadas (ancho x alto)
    });

    // Asegúrate de que el ancho máximo para el texto esté en pulgadas
    const maxWidth = 7.5; // Ancho máximo para el texto, dejando márgenes
    const lineas = doc.splitTextToSize(text, maxWidth);

    let y = 0.5; // Comienza a media pulgada desde la parte superior

    for (let i = 0; i < lineas.length; i++) {
        if (y > 10) { // Si y supera las 10 pulgadas, agrega una nueva página
            doc.addPage();
            y = 0.5; // Restablece el margen superior para la nueva página
        }
        doc.text(lineas[i], 0.5, y); // Comienza a media pulgada del borde izquierdo
        y += 0.25; // Aumenta en 0.25 pulgadas para la siguiente línea
    }

    doc.save('essAI.pdf');
}

appDiv.innerHTML = 'Holaaaa, Rellena el formulario !';

button.addEventListener('click', async () => {

    const titulo = formulario.querySelector('input[name="titulo"]').value;
    const tema = formulario.querySelector('input[name="tema"]').value;
    const referencias = formulario.querySelector('input[name="referencias"]').value;

    if (!titulo || !tema || !referencias) {
        alert("Rellena todo el formulario");
        appDiv.innerHTML = 'Rellena el formulario >:| !';
    } else {
        const prompt_introduccion = `Hablame de ${tema} como si fuera un ensayo, pero solo enfocate en como seria la introduccion del tema`;
        const prompt_hipotesis = `Hablame de ${tema} como si fuera un ensayo, pero solo enfocate en como seria la hipotesis del tema`;
        const prompt_desarrollo = `Hablame de ${tema} como si fuera un ensayo, pero solo enfocate en como seria el desarrollo del tema`;
        const prompt_conclusion = `Hablame de ${tema} como si fuera un ensayo, pero solo enfocate en como seria la conclusion del tema`;
        const prompt_bibliografia = `Escribe una bibliografia de ${referencias} referencias del tema: ${tema}, enumeradas`;


        appDiv.innerHTML = '';

        try {
            appDiv.innerHTML = "Espere mientras se genera el pdf";

            const response = await getCompletion(prompt_introduccion);
            console.log(response);

            const response2 = await getCompletion(prompt_hipotesis);
            console.log(response2);

            const response3 = await getCompletion(prompt_desarrollo);
            console.log(response3);

            const response4 = await getCompletion(prompt_conclusion);
            console.log(response4);

            const response5 = await getCompletion(prompt_bibliografia);
            console.log(response5);

            const allResponses = `${titulo}` + "\n\n" + "Introduccion: " + "\n" + response.choices[0].text + "\n\n" + "Hipotesis: " + "\n" + response2.choices[0].text + "\n\n" + "Desarrollo: " + "\n" + response3.choices[0].text + "\n\n" + "conclusion: " + "\n" + response4.choices[0].text + "\n\n" + "Bibliografia: " + "\n" + response5.choices[0].text;
            appDiv.innerHTML = 'Listo, Gracias por usar essAIs !!';
            generatePDF(allResponses);

        } catch (error) {
            console.error('Error al comunicarse con la API de OpenAI:', error);
            appDiv.innerHTML = 'Ocurrio un error :-(';
        }
    }

});




async function getCompletion(prompt) {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 2000,
        }),
    });

    const data = await response.json();
    // console.log(data)
    return data;
}