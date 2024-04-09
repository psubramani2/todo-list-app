import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './app-child.component.html',
  styleUrl: './app-child.component.css'
})
export class AppChildComponent {
  @Input() input_data :string | undefined;
  @Output() returnMessage= new EventEmitter();

  returnMessageToParent()
  {
    this.returnMessage.emit('parent message received, the message is'+this.input_data);
  }

}
