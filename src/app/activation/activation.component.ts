import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent {
  code: string
  constructor(private route: ActivatedRoute,private authService:AuthService) {}
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.authService.activateUser(this.code).subscribe((res)=>{
      console.log("Success");
    })
  }

}
