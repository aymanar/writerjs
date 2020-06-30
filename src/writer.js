class Writer {

    static global() {
        Writer.text = document.querySelector('.writer-text');
        Writer.wait_sentence = +Writer.text.getAttribute('data-wait-sentence');
        Writer.wait_letter = +Writer.text.getAttribute('data-wait-letter');
        Writer.sentences = Writer.text.getAttribute('data-sentences').split('<(*)>');
        Writer.sCount = 0;
        Writer.lCount = -1;
        Writer.interval;
        Writer.write;
    }

    constructor(sT, lT, sArr) {
        this.sT = sT;
        this.lT = lT;
        this.sArr = sArr;
    }

    // initialize writer effect
    init() {

        //* letter iteration
        if (Writer.lCount < this.sArr[Writer.sCount].length) { //? removed -1 to fix duplicating last letter bug
            Writer.lCount += 1;
        } else { // end of letters
            // clear
            clearInterval(Writer.interval);

            // wait
            setTimeout(() => {
                //! wipe out text field
                Writer.text.textContent = "";
                //! reset letter
                Writer.lCount = -1;

                //* sentences iteration
                if (Writer.sCount < this.sArr.length - 1) {
                    Writer.sCount += 1;
                } else { // end of sentence
                    //! reset sentences      
                    Writer.sCount = 0;
                }

                // set interval
                Writer.interval = setInterval(() => Writer.write.init(), this.lT);
            }, this.sT);

        }

        if (this.sArr[Writer.sCount][Writer.lCount] !== undefined) { //? fix duplicating last letter bug by ignoring undefined letters
            //* append letters
            Writer.text.textContent += this.sArr[Writer.sCount][Writer.lCount];
        }

    }

}
// init vars
Writer.global();
// new instance
Writer.write = new Writer(Writer.wait_sentence, Writer.wait_letter, Writer.sentences);
// initialize
window.addEventListener('DOMContentLoaded', () => setTimeout(() => Writer.interval = setInterval(() => Writer.write.init(), Writer.wait_letter), 1000));