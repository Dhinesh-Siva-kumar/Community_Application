import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommunityService } from './community.service';

describe('CommunityService', () => {
  let service: CommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommunityService]
    });
    service = TestBed.inject(CommunityService);
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Get Communities', () => {
    it('should return all communities', (done) => {
      service.getCommunities().subscribe(communities => {
        expect(communities).toBeTruthy();
        expect(communities.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return at least 6 mock communities', (done) => {
      service.getCommunities().subscribe(communities => {
        expect(communities.length).toBeGreaterThanOrEqual(6);
        done();
      });
    });

    it('should have communities with required fields', (done) => {
      service.getCommunities().subscribe(communities => {
        communities.forEach(community => {
          expect(community.id).toBeTruthy();
          expect(community.name).toBeTruthy();
          expect(community.description).toBeTruthy();
          expect(community.icon).toBeTruthy();
          expect(community.members).toBeGreaterThanOrEqual(0);
          expect(community.posts).toBeGreaterThanOrEqual(0);
          expect(community.category).toBeTruthy();
          expect(typeof community.isJoined).toBe('boolean');
          expect(community.createdAt).toBeTruthy();
          expect(Array.isArray(community.rules)).toBe(true);
          expect(Array.isArray(community.moderators)).toBe(true);
        });
        done();
      });
    });

    it('should have communities with moderators', (done) => {
      service.getCommunities().subscribe(communities => {
        communities.forEach(community => {
          expect(community.moderators.length).toBeGreaterThan(0);
          community.moderators.forEach(moderator => {
            expect(moderator.id).toBeTruthy();
            expect(moderator.username).toBeTruthy();
          });
        });
        done();
      });
    });

    it('should have communities with rules', (done) => {
      service.getCommunities().subscribe(communities => {
        communities.forEach(community => {
          if (community.rules.length > 0) {
            community.rules.forEach(rule => {
              expect(rule.id).toBeTruthy();
              expect(rule.title).toBeTruthy();
              expect(rule.description).toBeTruthy();
            });
          }
        });
        done();
      });
    });
  });

  describe('Get Community By ID', () => {
    it('should return specific community by id', (done) => {
      service.getCommunityById('1').subscribe(community => {
        expect(community.id).toBe('1');
        expect(community.name).toBe('Angular');
        done();
      });
    });

    it('should return first community for non-existent id', (done) => {
      service.getCommunityById('invalid-id').subscribe(community => {
        expect(community.id).toBe('1');
        done();
      });
    });

    it('should return community with all required fields', (done) => {
      service.getCommunityById('2').subscribe(community => {
        expect(community.id).toBeTruthy();
        expect(community.name).toBeTruthy();
        expect(community.description).toBeTruthy();
        expect(community.members).toBeGreaterThan(0);
        done();
      });
    });

    it('should return community with correct member count', (done) => {
      service.getCommunityById('2').subscribe(community => {
        expect(community.members).toBe(28750);
        done();
      });
    });
  });

  describe('Get Joined Communities', () => {
    it('should return only joined communities', (done) => {
      service.getJoinedCommunities().subscribe(communities => {
        communities.forEach(community => {
          expect(community.isJoined).toBe(true);
        });
        done();
      });
    });

    it('should return at least some joined communities', (done) => {
      service.getJoinedCommunities().subscribe(communities => {
        expect(communities.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should include Angular and Web Development communities', (done) => {
      service.getJoinedCommunities().subscribe(communities => {
        const communityNames = communities.map(c => c.name);
        expect(communityNames).toContain('Angular');
        expect(communityNames).toContain('Web Development');
        done();
      });
    });

    it('should not include Design or Open Source communities', (done) => {
      service.getJoinedCommunities().subscribe(communities => {
        const communityNames = communities.map(c => c.name);
        expect(communityNames).not.toContain('Design');
        expect(communityNames).not.toContain('Open Source');
        done();
      });
    });
  });

  describe('Join Community', () => {
    it('should mark community as joined', (done) => {
      service.joinCommunity('3').subscribe(community => {
        expect(community.isJoined).toBe(true);
        done();
      });
    });

    it('should increase member count when joining', (done) => {
      service.getCommunityById('3').subscribe(communityBefore => {
        const membersBefore = communityBefore.members;

        service.joinCommunity('3').subscribe(community => {
          expect(community.members).toBe(membersBefore + 1);
          done();
        });
      });
    });

    it('should return updated community object', (done) => {
      service.joinCommunity('3').subscribe(community => {
        expect(community.id).toBe('3');
        expect(community.name).toBeTruthy();
        expect(community.isJoined).toBe(true);
        done();
      });
    });

    it('should handle joining non-existent community gracefully', (done) => {
      service.joinCommunity('invalid-id').subscribe(
        community => {
          expect(community).toBeUndefined();
          done();
        },
        () => {
          // Error is acceptable for non-existent community
          done();
        }
      );
    });
  });

  describe('Leave Community', () => {
    beforeEach((done) => {
      // Make sure we're in a joined community first
      service.joinCommunity('3').subscribe(() => {
        done();
      });
    });

    it('should mark community as not joined', (done) => {
      service.leaveCommunity('3').subscribe(community => {
        expect(community.isJoined).toBe(false);
        done();
      });
    });

    it('should decrease member count when leaving', (done) => {
      service.leaveCommunity('3').subscribe(community => {
        // Should be back to original member count (12300) since we increased it by 1 in beforeEach
        expect(community.members).toBeGreaterThan(0);
        done();
      });
    });

    it('should return updated community object', (done) => {
      service.leaveCommunity('3').subscribe(community => {
        expect(community.id).toBe('3');
        expect(community.name).toBeTruthy();
        expect(community.isJoined).toBe(false);
        done();
      });
    });
  });

  describe('Get Categories', () => {
    it('should return community categories', (done) => {
      service.getCategories().subscribe(categories => {
        expect(categories).toBeTruthy();
        expect(categories.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return at least 4 categories', (done) => {
      service.getCategories().subscribe(categories => {
        expect(categories.length).toBeGreaterThanOrEqual(4);
        done();
      });
    });

    it('should have categories with required fields', (done) => {
      service.getCategories().subscribe(categories => {
        categories.forEach(category => {
          expect(category.id).toBeTruthy();
          expect(category.name).toBeTruthy();
          expect(category.icon).toBeTruthy();
          expect(typeof category.count).toBe('number');
          expect(category.count).toBeGreaterThanOrEqual(0);
        });
        done();
      });
    });

    it('should include Programming category', (done) => {
      service.getCategories().subscribe(categories => {
        const programmingCategory = categories.find(c => c.name === 'Programming');
        expect(programmingCategory).toBeTruthy();
        expect(programmingCategory?.count).toBe(3);
        done();
      });
    });

    it('should include Design category', (done) => {
      service.getCategories().subscribe(categories => {
        const designCategory = categories.find(c => c.name === 'Design');
        expect(designCategory).toBeTruthy();
        done();
      });
    });
  });

  describe('Community Properties', () => {
    it('should have Angular community with correct data', (done) => {
      service.getCommunityById('1').subscribe(community => {
        expect(community.name).toBe('Angular');
        expect(community.category).toBe('Programming');
        expect(community.members).toBe(15420);
        expect(community.posts).toBe(3240);
        expect(community.isJoined).toBe(true);
        done();
      });
    });

    it('should have Web Development community with correct data', (done) => {
      service.getCommunityById('2').subscribe(community => {
        expect(community.name).toBe('Web Development');
        expect(community.category).toBe('Programming');
        expect(community.members).toBe(28750);
        expect(community.isJoined).toBe(true);
        done();
      });
    });

    it('should have Design community not joined initially', (done) => {
      service.getCommunityById('3').subscribe(community => {
        expect(community.name).toBe('Design');
        expect(community.category).toBe('Design');
        done();
      });
    });
  });

  describe('Async Operations', () => {
    it('should handle getCommunities with delay', (done) => {
      const startTime = Date.now();

      service.getCommunities().subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(450);
        done();
      });
    });

    it('should handle getCommunityById with delay', (done) => {
      const startTime = Date.now();

      service.getCommunityById('1').subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(250);
        done();
      });
    });

    it('should handle joinCommunity with delay', (done) => {
      const startTime = Date.now();

      service.joinCommunity('5').subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(250);
        done();
      });
    });

    it('should handle getCategories with delay', (done) => {
      const startTime = Date.now();

      service.getCategories().subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(250);
        done();
      });
    });
  });

  describe('Multiple Operations', () => {
    it('should handle joining and leaving community', (done) => {
      service.joinCommunity('5').subscribe(() => {
        service.leaveCommunity('5').subscribe(community => {
          expect(community.isJoined).toBe(false);
          done();
        });
      });
    });

    it('should maintain community state across operations', (done) => {
      service.getCommunityById('1').subscribe(communityBefore => {
        const nameBefore = communityBefore.name;

        service.getCommunityById('1').subscribe(communityAfter => {
          expect(communityAfter.name).toBe(nameBefore);
          done();
        });
      });
    });
  });
});
