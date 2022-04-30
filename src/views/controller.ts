import path from 'path'
const index = async (req, res) => {
    const file = path.join(__dirname + '../../../views/index.html')
    res.sendFile(file);
}
export const ViewController = {
    index
}