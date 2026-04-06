<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate the public sitemap.xml file';

    public function handle(): int
    {
        $sitemap = Sitemap::create()
            ->add(Url::create(route('home'))->setPriority(1.0))
            ->add(Url::create(route('services.index'))->setPriority(0.8))
            ->add(Url::create(route('products.index'))->setPriority(0.8))
            ->add(Url::create(route('projects.index'))->setPriority(0.8))
            ->add(Url::create(route('about'))->setPriority(0.7))
            ->add(Url::create(route('certificates.index'))->setPriority(0.7))
            ->add(Url::create(route('contacts'))->setPriority(0.8));

        Product::query()
            ->select(['slug', 'updated_at'])
            ->cursor()
            ->each(function (Product $product) use ($sitemap): void {
                $sitemap->add(
                    Url::create(route('products.show', $product))
                        ->setLastModificationDate($product->updated_at)
                        ->setPriority(0.6)
                );
            });

        Project::query()
            ->select(['slug', 'updated_at'])
            ->cursor()
            ->each(function (Project $project) use ($sitemap): void {
                $sitemap->add(
                    Url::create(route('projects.show', $project))
                        ->setLastModificationDate($project->updated_at)
                        ->setPriority(0.6)
                );
            });

        Service::query()
            ->active()
            ->select(['slug', 'updated_at'])
            ->cursor()
            ->each(function (Service $service) use ($sitemap): void {
                $sitemap->add(
                    Url::create(route('services.show', $service))
                        ->setLastModificationDate($service->updated_at)
                        ->setPriority(0.6)
                );
            });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->components->info('Sitemap generated successfully.');

        return self::SUCCESS;
    }
}
