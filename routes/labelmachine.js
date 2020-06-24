const testFolder = 'public/images/trainingImages';
const outputFolder = 'public/images/outputs';

const fs = require('fs');

class LabelMachine {

    constructor() {
        this.fileNames = []
        this.getNumberOfImagesFromFolder()
        this.currentFile = this.fileNames.shift()
    }

     getNumberOfImagesFromFolder() {
        fs.readdirSync(testFolder).forEach(file => {
            this.fileNames.push(file)
          });
    }

    getNext() {
        this.currentFile = this.fileNames.shift()
        return this.currentFile
    }

    applyLabel(labels) {
        let labeledFileName = ""
        if (typeof labels === "string") {
            labeledFileName = labels + "-"
        } else {
          for (var label of labels) {
                labeledFileName += label + "-"
            }
        }
        fs.copyFile(testFolder+"/"+this.currentFile, outputFolder+"/"+labeledFileName+this.currentFile, (err) => { 
            if (err) {
                console.log("issue copying file")
            }
        })
    }

}

module.exports = LabelMachine;