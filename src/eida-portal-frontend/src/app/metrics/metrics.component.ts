import { Component, OnInit } from "@angular/core";
import { TextService } from "../text.service";

@Component({
  selector: "app-metrics",
  templateUrl: "./metrics.component.html",
  styleUrls: ["./metrics.component.css"]
})
export class MetricsComponent implements OnInit {
  constructor(public textService: TextService) {}

  ngOnInit() {}
}
