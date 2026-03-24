import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Community, CommunityCategory } from '../models';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private readonly API_URL = '/api/communities';

  constructor(private http: HttpClient) {}

  private mockCommunities: Community[] = [
    {
      id: '1',
      name: 'Angular',
      description: 'A community for Angular developers. Share knowledge, ask questions, and stay up to date with the latest Angular news and best practices.',
      icon: 'code',
      banner: '',
      members: 15420,
      posts: 3240,
      category: 'Programming',
      isJoined: true,
      createdAt: new Date('2023-01-01'),
      rules: [
        { id: '1', title: 'Be Respectful', description: 'Treat all members with respect. No harassment or hate speech.' },
        { id: '2', title: 'Stay On Topic', description: 'Posts should be related to Angular development.' },
        { id: '3', title: 'No Spam', description: 'Do not post promotional content or spam.' }
      ],
      moderators: [
        { id: '1', username: 'angular_admin', avatar: '' },
        { id: '2', username: 'ng_moderator', avatar: '' }
      ]
    },
    {
      id: '2',
      name: 'Web Development',
      description: 'Everything about web development — frontend, backend, full-stack. HTML, CSS, JavaScript, TypeScript, and all the frameworks.',
      icon: 'web',
      banner: '',
      members: 28750,
      posts: 7890,
      category: 'Programming',
      isJoined: true,
      createdAt: new Date('2022-06-15'),
      rules: [
        { id: '1', title: 'Be Kind', description: 'Help others learn, no gatekeeping.' },
        { id: '2', title: 'Quality Posts', description: 'Provide context and details in your questions.' }
      ],
      moderators: [
        { id: '3', username: 'webdev_lead', avatar: '' }
      ]
    },
    {
      id: '3',
      name: 'Design',
      description: 'A community for UI/UX designers, graphic designers, and anyone passionate about creating beautiful digital experiences.',
      icon: 'palette',
      banner: '',
      members: 12300,
      posts: 2150,
      category: 'Design',
      isJoined: false,
      createdAt: new Date('2023-03-20'),
      rules: [
        { id: '1', title: 'Share Your Work', description: 'Always credit original creators.' },
        { id: '2', title: 'Constructive Feedback', description: 'Provide helpful, constructive criticism.' }
      ],
      moderators: [
        { id: '4', username: 'design_guru', avatar: '' }
      ]
    },
    {
      id: '4',
      name: 'Technology',
      description: 'Discuss the latest in technology — AI, cloud computing, blockchain, IoT, and emerging tech trends.',
      icon: 'memory',
      banner: '',
      members: 34500,
      posts: 9100,
      category: 'Technology',
      isJoined: true,
      createdAt: new Date('2022-01-10'),
      rules: [
        { id: '1', title: 'Fact-Check', description: 'Verify your claims with credible sources.' },
        { id: '2', title: 'No Misinformation', description: 'Do not spread unverified tech rumors.' }
      ],
      moderators: [
        { id: '5', username: 'tech_admin', avatar: '' }
      ]
    },
    {
      id: '5',
      name: 'Open Source',
      description: 'Celebrate and contribute to open source projects. Share your repos, find collaborators, and discuss open source culture.',
      icon: 'folder_open',
      banner: '',
      members: 8900,
      posts: 1680,
      category: 'Programming',
      isJoined: false,
      createdAt: new Date('2023-07-01'),
      rules: [
        { id: '1', title: 'Link Your Repos', description: 'When sharing projects, include links.' },
        { id: '2', title: 'Be Inclusive', description: 'Open source is for everyone.' }
      ],
      moderators: [
        { id: '6', username: 'oss_champion', avatar: '' }
      ]
    },
    {
      id: '6',
      name: 'DevOps',
      description: 'Everything DevOps — CI/CD, Docker, Kubernetes, infrastructure as code, monitoring, and site reliability engineering.',
      icon: 'settings',
      banner: '',
      members: 11200,
      posts: 2890,
      category: 'Infrastructure',
      isJoined: false,
      createdAt: new Date('2023-02-14'),
      rules: [
        { id: '1', title: 'Share Configs Safely', description: 'Never share secrets or credentials.' },
        { id: '2', title: 'Practical Advice', description: 'Focus on actionable solutions.' }
      ],
      moderators: [
        { id: '7', username: 'devops_master', avatar: '' }
      ]
    }
  ];

  getCommunities(): Observable<Community[]> {
    // return this.http.get<Community[]>(this.API_URL);
    return of(this.mockCommunities).pipe(delay(500));
  }

  getCommunityById(id: string): Observable<Community> {
    // return this.http.get<Community>(`${this.API_URL}/${id}`);
    const community = this.mockCommunities.find(c => c.id === id) || this.mockCommunities[0];
    return of(community).pipe(delay(300));
  }

  getJoinedCommunities(): Observable<Community[]> {
    // return this.http.get<Community[]>(`${this.API_URL}/joined`);
    return of(this.mockCommunities.filter(c => c.isJoined)).pipe(delay(400));
  }

  joinCommunity(communityId: string): Observable<Community> {
    // return this.http.post<Community>(`${this.API_URL}/${communityId}/join`, {});
    const community = this.mockCommunities.find(c => c.id === communityId);
    if (community) {
      community.isJoined = true;
      community.members++;
    }
    return of(community!).pipe(delay(300));
  }

  leaveCommunity(communityId: string): Observable<Community> {
    // return this.http.post<Community>(`${this.API_URL}/${communityId}/leave`, {});
    const community = this.mockCommunities.find(c => c.id === communityId);
    if (community) {
      community.isJoined = false;
      community.members--;
    }
    return of(community!).pipe(delay(300));
  }

  searchCommunities(query: string): Observable<Community[]> {
    // return this.http.get<Community[]>(`${this.API_URL}/search`, { params: { q: query } });
    const lowerQuery = query.toLowerCase();
    const results = this.mockCommunities.filter(c =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery)
    );
    return of(results).pipe(delay(300));
  }

  getCategories(): Observable<CommunityCategory[]> {
    const categories: CommunityCategory[] = [
      { id: '1', name: 'Programming', icon: 'code', count: 3 },
      { id: '2', name: 'Design', icon: 'palette', count: 1 },
      { id: '3', name: 'Technology', icon: 'memory', count: 1 },
      { id: '4', name: 'Infrastructure', icon: 'settings', count: 1 }
    ];
    return of(categories).pipe(delay(300));
  }
}
