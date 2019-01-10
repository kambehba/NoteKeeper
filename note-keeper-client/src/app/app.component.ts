import { Component } from '@angular/core';
import {Note} from './note';
//import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { NotesService } from "./noteService";
//import { SSL_OP_ALL } from 'constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public notes:Note[]=[];
  public newNoteBalance : string;
  public newNoteInterest : string;
  public newNoteMp : string;
  public newNoteId : string;
  private isEditMode : boolean;
  private noteToBeUpdated : Note;

  constructor( public notesService: NotesService,) 
  { 
   
    this.noteToBeUpdated = new Note();

    this.isEditMode = false;

    this.notesService.getNotesUpdateListener()
    .subscribe((notes:Note[])=>{

      this.notes = notes;
      console.log("Notes are Loaded***///" + this.notes[0].Id);
    });

   //this.notesService.getNotes();
  

  }

  showNoteData : boolean = false;
  showNewNoteForm : boolean = false;


  OnNewNoteClicked()
  {
    this.newNoteBalance =  "";
    this.newNoteInterest =  "";
    this.newNoteMp =  "";

    this.showNewNoteForm = true;
    this.showNoteData = false;
    this.isEditMode = false;
   
  }

  OnLoadNotesClicked()
  {
    this.notesService.getNotesFirstPage();
    this.showNoteData = true;
    this.showNewNoteForm = false;

  }

  GetAllNotes()
  {
   

  }

  OnNextPageClicked()
  {
    this.notesService.getNotes();

  }

  

  OnSaveNoteClicked()
  {
    if(this.isEditMode)
    {
     
      this.noteToBeUpdated.Balance =  this.newNoteBalance;
      this.noteToBeUpdated.Interest =  this.newNoteInterest;
      this.noteToBeUpdated.MP=  this.newNoteMp;
      this.noteToBeUpdated.Id =  this.newNoteId;

      console.log("************" +  this.noteToBeUpdated.Balance );
      console.log("************" +  this.noteToBeUpdated.Interest );
      console.log("************" +  this.noteToBeUpdated.Id );

      this.notesService.updateNote(this.noteToBeUpdated);

    }

    else
    {
      var note = new Note();
      note.Balance = this.newNoteBalance;
      note.Interest = this.newNoteInterest;
      note.MP = this.newNoteMp;
      note.Id = null;
      this.notesService.addNote(note);

    }

    this.showNewNoteForm = false;
  }

  OnEditClicked(note:Note)
  {
    this.newNoteBalance = note.Balance;
    this.newNoteInterest = note.Interest;
    this.newNoteMp = note.MP;
    this.newNoteId = note.Id;
     

    this.showNewNoteForm = true;
    this.isEditMode = true;
  }


  OnDeleteClicked(note:Note)
  {
    this.notesService.deletePost(note);
    //this.notesService.getNotes();
    console.log("***********DELETE");
   
  }

  



  
}
