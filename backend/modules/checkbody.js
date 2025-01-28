
const checkBody = (req, inputs) => inputs.every(el => req[el]?.toString().trim());
/*const transformDate = (req) => {
    const newDate = new Date(req).toISOString().replace('Z', '+00:00');
    console.log(newDate)
}*/

module.exports = { checkBody };
//module.exports = { transformDate };
