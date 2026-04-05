import { Project as TsProject, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from "ts-morph";

const project = new TsProject();
project.addSourceFilesAtPaths("src/data/projects.ts");

const sourceFile = project.getSourceFileOrThrow("src/data/projects.ts");

// 1. Update the type alias
const typeAlias = sourceFile.getTypeAliasOrThrow("Project");
const typeNode = typeAlias.getTypeNodeOrThrow();

if (typeNode.getKind() === SyntaxKind.TypeLiteral) {
  const properties = typeNode.asKindOrThrow(SyntaxKind.TypeLiteral).getProperties();
  for (const prop of properties) {
    const name = prop.getName();
    if (["description", "problem", "solution"].includes(name)) {
      prop.setType("{ en: string; id: string; }");
    } else if (name === "features") {
      prop.setType("{ en: string[]; id: string[]; }");
    }
  }
}

// 2. Update the array of projects
const variableDecl = sourceFile.getVariableDeclarationOrThrow("projects");
const initializer = variableDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const elements = initializer.getElements();

for (const element of elements) {
  if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
    const obj = element as ObjectLiteralExpression;
    
    for (const propName of ["description", "problem", "solution", "features"]) {
      const prop = obj.getProperty(propName);
      if (prop && prop.getKind() === SyntaxKind.PropertyAssignment) {
        const propAssignment = prop as PropertyAssignment;
        const initializerStr = propAssignment.getInitializer()?.getText() || '""';
        // replace with an object mapping en and id to the same original string/array
        propAssignment.setInitializer(`{ en: ${initializerStr}, id: ${initializerStr} }`);
      }
    }
  }
}

sourceFile.saveSync();
console.log("Successfully refactored projects.ts");
