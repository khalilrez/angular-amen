import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable()
export class ChatService {
  constructor() {}

  conversation = new Subject<Message[]>();

  messageMap:any = {
    "defaultmsg":"Je ne comprends pas votre message. Peut être que vous pouvez choisir une question de la liste de suggestion ? ",
    "Bonjour": "Bonjour! Comment puis-je vous assister aujourd'hui ?",
    "Quelles sont les heures d'ouverture ?": "Nos agences sont ouvertes du lundi au vendredi de 8h00 à 17h00.",
    "Comment puis-je ouvrir un compte ?": "Pour ouvrir un compte, veuillez vous rendre dans l'une de nos agences avec vos pièces d'identité et un justificatif de domicile.",
    "Quels sont les services bancaires que vous proposez ?": "Nous proposons une gamme complète de services bancaires, y compris les comptes chèques et d'épargne, les prêts, les cartes de crédit et bien plus encore.",
    "Comment puis-je contacter le service client ?": "Vous pouvez contacter notre service client au 71 833 517 / 71 148 000 ou envoyer un e-mail à amenbank@amenbank.com.tn.",
    "Quelles sont les offres de prêt disponibles ?": "Nous offrons une variété de prêts, y compris les prêts immobiliers, les prêts auto et les prêts personnels. Veuillez visiter notre site web pour plus de détails.",
    "Comment faire opposition sur ma carte ?": "En cas de perte ou de vol de votre carte, veuillez appeler notre ligne d'assistance 24/7 au 0800 789 123 pour faire opposition immédiate.",
    "Comment puis-je accéder à mes relevés de compte en ligne ?": "Vous pouvez accéder à vos relevés de compte en vous connectant à votre espace client sur notre site web ou via notre application mobile.",
    "Quels sont les taux d'intérêt pour les comptes d'épargne ?": "Les taux d'intérêt varient en fonction du type de compte d'épargne que vous choisissez. Veuillez consulter notre site web ou contacter notre service client pour les taux actuels.",
    "Comment puis-je changer mon code PIN ?": "Vous pouvez changer votre code PIN en utilisant nos guichets automatiques ou en vous rendant à l'une de nos agences.",
    "Comment puis-je activer la fonctionnalité de paiement sans contact sur ma carte ?": "La fonctionnalité de paiement sans contact est activée par défaut sur nos nouvelles cartes. Si vous avez une ancienne carte, veuillez contacter notre service client pour plus d'informations.",
    "Comment puis-je investir sur les marchés financiers ?": "Pour investir sur les marchés financiers, nous vous recommandons de prendre rendez-vous avec l'un de nos conseillers en placement. Ils pourront vous guider à travers les options disponibles.",
  }
  chatbotResponses: string[] = Object.keys(this.messageMap); // Extract questions for autocomplete

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['defaultmsg'];
  }
}