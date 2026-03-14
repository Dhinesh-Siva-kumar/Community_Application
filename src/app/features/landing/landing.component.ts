import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingPageComponent {
  features = [
    {
      icon: 'bi-people-fill',
      title: 'Join Communities',
      description: 'Discover and join thousands of communities that match your passions, hobbies, and professional interests.',
      color: 'feature-purple'
    },
    {
      icon: 'bi-chat-dots-fill',
      title: 'Share Posts & Discussions',
      description: 'Start conversations, share ideas, post articles, and engage in meaningful discussions with community members.',
      color: 'feature-blue'
    },
    {
      icon: 'bi-heart-fill',
      title: 'Meet Like-Minded People',
      description: 'Connect with people who share your interests and build lasting relationships across the globe.',
      color: 'feature-pink'
    },
    {
      icon: 'bi-bell-fill',
      title: 'Real-Time Notifications',
      description: 'Stay up to date with instant notifications for replies, mentions, community updates, and new connections.',
      color: 'feature-green'
    }
  ];

  communities = [
    {
      icon: 'bi-code-slash',
      name: 'Developers',
      description: 'A hub for software engineers, open-source enthusiasts, and tech innovators to collaborate and grow.',
      members: '128K',
      color: 'community-purple',
      badge: 'Tech'
    },
    {
      icon: 'bi-palette-fill',
      name: 'Designers',
      description: 'Where UI/UX designers, illustrators, and creatives share inspiration, feedback, and design resources.',
      members: '64K',
      color: 'community-pink',
      badge: 'Creative'
    },
    {
      icon: 'bi-graph-up-arrow',
      name: 'Entrepreneurs',
      description: 'Connect with founders, investors, and business leaders to share insights and grow your ventures.',
      members: '45K',
      color: 'community-orange',
      badge: 'Business'
    },
    {
      icon: 'bi-controller',
      name: 'Gamers',
      description: 'Level up your gaming experience by connecting with players, streamers, and gaming communities worldwide.',
      members: '210K',
      color: 'community-blue',
      badge: 'Gaming'
    }
  ];

  steps = [
    {
      number: '01',
      icon: 'bi-person-plus-fill',
      title: 'Create an Account',
      description: "Sign up for free in seconds. No credit card required. Just your email and you're in!"
    },
    {
      number: '02',
      icon: 'bi-compass-fill',
      title: 'Join Communities',
      description: 'Browse and join communities that match your interests, profession, or hobbies.'
    },
    {
      number: '03',
      icon: 'bi-send-fill',
      title: 'Share & Interact',
      description: 'Post content, comment on discussions, and engage with members who share your passion.'
    }
  ];

  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
