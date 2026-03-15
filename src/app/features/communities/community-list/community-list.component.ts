import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Community, CommunityCategory } from '../../../core/models';
import { CommunityService } from '../../../core/services/community.service';

@Component({
  selector: 'app-community-list',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule, MatIconModule ],
  templateUrl: './community-list.component.html',
  styleUrl: './community-list.component.scss'
})
export class CommunityListComponent implements OnInit {
  communities = signal<Community[]>([]);
  categories = signal<CommunityCategory[]>([]);
  filteredCommunities = signal<Community[]>([]);
  loading = signal(true);
  searchQuery = '';
  selectedCategory = signal('all');

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe(communities => {
      this.communities.set(communities);
      this.filteredCommunities.set(communities);
      this.loading.set(false);
    });
    this.communityService.getCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    const category = this.selectedCategory();
    let filtered = this.communities();
    if (query) filtered = filtered.filter(c => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query));
    if (category !== 'all') filtered = filtered.filter(c => c.category === category);
    this.filteredCommunities.set(filtered);
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory.set(category);
    this.onSearch();
  }

  toggleJoin(community: Community): void {
    if (community.isJoined) {
      this.communityService.leaveCommunity(community.id).subscribe(() => {
        this.communities.update(list => list.map(c => c.id === community.id ? { ...c, isJoined: false, members: c.members - 1 } : c));
        this.onSearch();
      });
    } else {
      this.communityService.joinCommunity(community.id).subscribe(() => {
        this.communities.update(list => list.map(c => c.id === community.id ? { ...c, isJoined: true, members: c.members + 1 } : c));
        this.onSearch();
      });
    }
  }
}

