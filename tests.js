const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
const JSDOM = require('jsdom').JSDOM;

chai.use(require('chai-dom'));
require('jsdom-global')();

const GamePlayed = require('./index').GamePlayed;
const createDeleteButton = require('./index').createDeleteButton;
const recalculateGlobalKDRatio = require('./index').recalculateGlobalKDRatio;
const validateForm = require('./index').validateForm;



describe('Week 10 Coding Assignment Test Suite:', ()=>{
  beforeEach((done) => {
    JSDOM.fromFile('index.html').then((dom) => {
      global.document = dom.window.document
    }).then(done,done);
  })
  describe('Form validation should work', () =>{
    it('Should fail when any input is not supplied', ()=> {
      let noErrors = validateForm('','Any','Any');
      expect(noErrors).to.equal(false);
      noErrors = validateForm(new Date, '', 'Any');
      expect(noErrors).to.equal(false);
      noErrors = validateForm(new Date(), 'Any', '');
      expect(noErrors).to.equal(false);
      noErrors = validateForm(new Date(), 'Any', 'Any');
      expect(noErrors).to.equal(true);
    })
  })
  describe('delete button create should work with proper ID', ()=>{
    it('Should create button when ID is passed', () => {
      let id = 0;
      let button = createDeleteButton(id);
      expect(button.id).to.equal(`${id}`);
      expect(button.innerHTML).to.equal('Delete');
      button = createDeleteButton();
      expect(button).to.equal(null);
    });
  })
  describe('calculating global KD should work', () => {
    it('Should properly calculate K/D ratio', ()=> {
      let ratio = recalculateGlobalKDRatio();
      expect(ratio).to.equal(0);
      let gamesPlayed = []
      let game1 = new GamePlayed('Any','Any','Any',10,5);
      gamesPlayed.push(game1);
      ratio = recalculateGlobalKDRatio(gamesPlayed);
      expect(document.getElementById('globalKD').value).to.equal('2.00');
    })
  })
});