import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  videoPlayer: HTMLVideoElement;

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('videoPlayer', { static: false })
  set mainVideoEl(el: ElementRef) {
    this.videoPlayer = el.nativeElement;
  }

  toggleVideo(event: any) {
    this.videoPlayer.play();
  }

}
