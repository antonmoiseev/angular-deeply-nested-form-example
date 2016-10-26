import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-question',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: QuestionComponent },
    // { provide: NG_VALIDATORS, multi: true, useExisting: QuestionComponent }
  ],
  template: `
    <div [formGroup]="model">
      <input type="hidden" formControlName="id">
      <input type="checkbox" formControlName="value">
      {{ question.text }}
      <button (click)="addAttachment()">Add attachment</button>

      <ol *ngIf="question.subquestions" formArrayName="subquestions">
        <li *ngFor="let q of model.get('subquestions').controls; let i=index">
          <app-question [question]="getQuestion(q.value.id)" [formControlName]="i"></app-question>
        </li>
      </ol>

      <ol *ngIf="question.attachments" formArrayName="attachments">
        <li *ngFor="let a of model.get('attachments').controls; let i=index">
          {{ getAttachment(a.value).fileName }}
          <button (click)="removeAttachment(i)">Remove</button>
        </li>
      </ol>
    </div>

  `
})
export class QuestionComponent implements ControlValueAccessor {

  static attachmentCounter: number = 1;

  model: FormGroup;

  @Input() question: any;

  constructor(private fb: FormBuilder) {

    this.model = fb.group({
      id: [],
      value: []
    });

  }

  ngOnInit() {
    if (this.question.subquestions) {
      this.model.addControl('subquestions',
        this.fb.array(this.question.subquestions.map(q => [{ id: q.id, value: q.value}])));
    }

    if (this.question.attachments) {
      this.model.addControl('attachments',
        this.fb.array(this.question.attachments.map(a => [a.id])));
    }
  }

  getQuestion(id: string) {
    if (this.question.subquestions) {
      return this.question.subquestions.find(q => q.id === id);
    }
  }

  getAttachment(id: string) {
    if (this.question.attachments) {
      return this.question.attachments.find(a => a.id === id);
    }
  }

  addAttachment() {

    const newId = QuestionComponent.attachmentCounter++;
    const newAttachment = {
      id: `counter ${newId}`,
      fileName: `Attachment ${newId}`
    };

    if (!this.question.attachments) {
      this.question.attachments = [];
    }

    this.question.attachments.push(newAttachment);

    const attachments = this.model.get('attachments') as FormArray;
    attachments.push(new FormControl(newAttachment.id));
  }

  removeAttachment(i: number) {
    const attachments = this.model.get('attachments') as FormArray;
    attachments.removeAt(i);
  }

  writeValue(value: any) {
    if (value) {
      this.model.patchValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.model.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}
}
