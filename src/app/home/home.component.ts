import { Component, OnInit, ViewChild, ElementRef,Input,EventEmitter,Output } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormControl, FormGroup} from '@angular/forms'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDisabled = true;
  topicForm: FormGroup;
  detailForm: FormGroup;
  day_data = [];
  topic_data = [];
  current_day = null;
  current_topic = null;
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.topicForm = this.fb.group({
      topic: this.fb.control('')
    });
    this.detailForm = this.fb.group({
      detail: this.fb.control(this.getDetails())
    })
    
  }
  close(){
    console.log(this.topicForm.value.topic);
    this.addTopic(this.topicForm.value.topic);
    this.activeModal.close('Closed');
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.close();
    }, (reason) => {
    });
  }
  setDay(num){
    this.current_day = num;
    this.getTopics(num);
  }

  ngOnInit(): void {
  }
  addDay(){
    let n = this.day_data.length+1;
    this.day_data.push({
      id: n,
      topic: []
    }
      );
      console.log(this.day_data);
  }
  getTopics(num){

    var container = document.getElementById("topics") as HTMLInputElement;
    container.innerHTML = "";
    console.log(this.day_data[num-1].topic)
    var topic = this.day_data[num-1].topic;
    for(let i=0;i<topic.length;i++){
      container.innerHTML+= `<li class="list-group-item" ><a href="#" onclick="`+this.setTopic(topic[i])+`">`+topic[i]+`</a></li>`
    }
  }
  addTopic(data){
    let n = this.topic_data.length+1;
    this.topic_data.push({
      name: data,
      text: ""
    }
    );
    this.day_data[this.current_day-1].topic.push(data);
    this.getTopics(this.current_day);
  }
  setTopic(data){
    this.current_topic = data;
    document.getElementById("detail")
  }
  submitDetails(){
    for(let i = 0;i<this.topic_data.length;i++){
      if(this.topic_data[i].name ==this.current_topic ){
        this.topic_data[i].text =this.detailForm.value.detail
      }
    }
  }
  getDetails(){
    for(let i = 0;i<this.topic_data.length;i++){
      if(this.topic_data[i].name ==this.current_topic ){
        return this.topic_data[i].text;
      }
    }
    return '';
  }


}
