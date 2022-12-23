class DragTextCard {
    constructor(words, rules, weights) {
      this.words = words;
      this.rules = rules;
      this.weights = weights;
      this.element = this.createElement();
      this.cardContainer = null;
      this.currentWordIndex = 0;
    }
  
    createElement() {
      // create the main card element
      const cardElement = document.createElement('div');
      cardElement.classList.add('drag-text-card');
  
      // create the carousel container
      const carouselElement = document.createElement('div');
      carouselElement.classList.add('carousel-container');
  
      // create the input and submit button elements
      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      const submitButton = document.createElement('button');
      submitButton.textContent = 'Submit';
  
      // add the input and submit button to the card element
      cardElement.appendChild(carouselElement);
      cardElement.appendChild(inputElement);
      cardElement.appendChild(submitButton);
  
      // create the initial carousel items
      this.updateCarousel();
  
      return cardElement;
    }
  
    updateCarousel() {
      // generate the random words for the carousel
      const words = this.generateRandomWords();
  
      // clear the current carousel items
      this.carouselContainer.innerHTML = '';
  
      // create the new carousel items
      words.forEach((word) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.textContent = word;
        this.carouselContainer.appendChild(item);
      });
    }
  
    generateRandomWords() {
        // create an empty array to store the generated words
        const generatedWords = [];

        // iterate over each rule
        for (let i = 0; i < this.rules.length; i++) {
        // get the current rule and weight
        const rule = this.rules[i];
        const weight = this.weights[i];

        // generate a random number between 0 and 1
        const randomNum = Math.random();

        // if the random number is less than the weight, add the
        // corresponding word from the dictionary to the generated words
        if (randomNum < weight) {
            generatedWords.push(this.words[rule]);
        }
        }

        return generatedWords;
    }
  
    mount(parentElement) {
      // add the card element to the provided parent element
      parentElement.appendChild(this.element);
  
      // cache the carousel container for future updates
      this.carouselContainer = this.element.querySelector('.carousel-container');
  
      // add event listeners for drag functionality
      // implementation details omitted for brevity
  
      // add event listener for the submit button
      this.element.querySelector('button').addEventListener('click', () => {
        this.updateCarousel();
      });
    }
  }
  

  /*

    // create a dictionary of words
    const words = ['apple', 'banana', 'carrot', 'durian'];

    // create the rules for generating random words
    const rules = [0, 1, 2, 3];

    // create the weights for each rule
    const weights = [0.25, 0.25, 0.25, 0.25];

    // create a new DragTextCard instance
    const dragTextCard = new DragTextCard(words, rules, weights);

    // mount the card to the document body
    dragTextCard.mount(document.body);


  */