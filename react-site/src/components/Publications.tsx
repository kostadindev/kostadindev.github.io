import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { publications } from '../data/content';
import SectionHeader, { Section } from './SectionHeader';
import { Meta } from './typography';

export default function Publications() {
  return (
    <Section id="publications">
      <SectionHeader id="publications-title" title="Publications" />

      <div className="grid gap-6">
        {publications.map((pub) => (
          <Card key={pub.title}>
            <CardHeader>
              <div className="flex flex-wrap gap-1.5 pb-1">
                {pub.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-lg leading-snug">
                <h3>{pub.title}</h3>
              </CardTitle>
              <CardDescription className="text-base leading-7">{pub.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{pub.authors}</p>
              <Meta className="italic">* All authors contributed equally</Meta>
              <Meta>
                {pub.journal} ({pub.year})
              </Meta>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <a href={pub.doi} target="_blank" rel="noopener">
                  <FileText />
                  View publication
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
