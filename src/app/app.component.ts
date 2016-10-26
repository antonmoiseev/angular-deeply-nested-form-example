import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  data: any;

  model: FormGroup;

  constructor(fb: FormBuilder) {
    this.data = response;
    this.model = fb.group({
      questions: fb.array(this.data.map(q => [{ id: q.id, value: q.value }]))
    });

    this.model.valueChanges
      .subscribe(value => console.log(JSON.stringify(value, null, 2)));
  }

  getQuestion(id: string) {
    return this.data.find(q => q.id === id);
  }
}

var response = [
  {
    id: '1',
    text: 'A car averages 27 miles per gallon. If gas costs $4.04 per gallon, which of the following is closest to how much the gas would cost for this car to travel 2,727 typical miles?',
    value: false
  },
  {
    id: '2',
    text: 'What is the value of x when 2x + 3 = 3x – 4 ?',
    value: true,
    subquestions: [
      {
        id: '2-1',
        text: 'What is the greatest common factor of 42, 126, and 210 ?',
        value: true,
        attachments: [
          {
            id: '2-1-1',
            fileName: "Explentation-document.pdf",
            date: new Date()
          },
          {
            id: '2-1-2',
            fileName: "Explentation-document2.pdf",
            date: new Date()
          }
        ]
      },
      {
        id: '2-2',
        text: 'How many irrational numbers are there between 1 and 6 ?',
        value: false,
        attachments: [
          {
            id: '2-2-1',
            fileName: "Explentation-document.pdf",
            date: new Date()
          },
          {
            id: '2-2-2',
            fileName: "Explentation-document2.pdf",
            date: new Date()
          }
        ]
      }
    ]
  },
  {
    id: '3',
    text: 'Abandoned mines frequently fill with water. Before an abandoned mine can be reopened, the water must be pumped out. The size of pump required depends on the depth of the mine. If pumping out a mine that is D feet deep requires a pump that pumps a minimum of + 4D - 250 gallons per minute, pumping out a mine that is 150 feet deep would require a pump that pumps a minimum of how many gallons per minute?',
    value: false
  }
];
