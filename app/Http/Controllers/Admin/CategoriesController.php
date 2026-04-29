<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\Admin\CategoryResource as AdminCategoryResource;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoriesController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = min(max(5, (int) $request->input('per_page', 15)), 100);
        $type = CategoryType::tryFrom((string) $request->string('type'));

        return Inertia::render('admin/categories/index', [
            'categories' => AdminCategoryResource::collection(
                Category::query()
                    ->withCount(['projects', 'products'])
                    ->when($request->filled('search'), fn ($query) => $query->where('name->bg', 'like', '%'.$request->string('search').'%'))
                    ->when($type, fn ($query) => $query->where('type', $type))
                    ->latest()
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'filters' => [
                'search' => $request->string('search')->toString() ?: null,
                'per_page' => $perPage,
                'type' => $type?->value,
            ],
            'types' => collect(CategoryType::cases())
                ->map(fn (CategoryType $categoryType) => [
                    'value' => $categoryType->value,
                    'label' => $categoryType->label(),
                ])
                ->values(),
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        Category::create($request->validated());

        return redirect()->back()
            ->with('success', 'Category created.');
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        return redirect()->back()
            ->with('success', 'Category updated.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->loadCount(['projects', 'products']);

        if (($category->projects_count + $category->products_count) > 0) {
            abort(409, 'This category is already in use.');
        }

        $category->delete();

        return redirect()->back()
            ->with('success', 'Category deleted.');
    }
}
