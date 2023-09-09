import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from '../_services/transfer.service';
import { ITransfer } from '../_models/itransfer';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent {
  rib: string
  sentTransfers:ITransfer[];
  receivedTransfers:ITransfer[];

  constructor(private route: ActivatedRoute,private transferService:TransferService) {}
  ngOnInit(): void {
    this.rib = this.route.snapshot.paramMap.get('rib');
    this.transferService.findAllBasedOnDirection(this.rib).subscribe((res)=>{
      this.sentTransfers = res.sentTransfers;
      this.receivedTransfers = res.receivedTransfers;
      console.log(this.sentTransfers)
      console.log(this.receivedTransfers)

    })
  }
}
