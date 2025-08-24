from typing import List, Optional
from app.domain.models.trademark import Trademark, TrademarkCreate, TrademarkUpdate
from app.domain.interfaces.trademark_interface import TrademarkRepositoryInterface

class TrademarkService:
    def __init__(self, trademark_repository: TrademarkRepositoryInterface):
        self._repository = trademark_repository
    
    def create_trademark(self, trademark_data: TrademarkCreate) -> Trademark:
        # Business logic: Check if brand name already exists
        existing_trademark = self._repository.get_by_brand_name(trademark_data.brand_name)
        if existing_trademark:
            raise ValueError(f"Trademark with brand name '{trademark_data.brand_name}' already exists")
        
        return self._repository.create(trademark_data)
    
    def get_trademark_by_id(self, trademark_id: int) -> Optional[Trademark]:
        if trademark_id <= 0:
            raise ValueError("Trademark ID must be positive")
        
        return self._repository.get_by_id(trademark_id)
    
    def get_all_trademarks(self, skip: int = 0, limit: int = 100) -> List[Trademark]:
        if skip < 0:
            raise ValueError("Skip value must be non-negative")
        if limit <= 0 or limit > 1000:
            raise ValueError("Limit must be between 1 and 1000")
        
        return self._repository.get_all(skip=skip, limit=limit)
    
    def update_trademark(self, trademark_id: int, trademark_update: TrademarkUpdate) -> Optional[Trademark]:
        if trademark_id <= 0:
            raise ValueError("Trademark ID must be positive")
        
        # Check if trademark exists
        existing_trademark = self._repository.get_by_id(trademark_id)
        if not existing_trademark:
            return None
        
        # Business logic: Check if brand name already exists (if updating brand name)
        if trademark_update.brand_name:
            existing_with_name = self._repository.get_by_brand_name(trademark_update.brand_name)
            if existing_with_name and existing_with_name.id != trademark_id:
                raise ValueError(f"Trademark with brand name '{trademark_update.brand_name}' already exists")
        
        return self._repository.update(trademark_id, trademark_update)
    
    def delete_trademark(self, trademark_id: int) -> bool:
        if trademark_id <= 0:
            raise ValueError("Trademark ID must be positive")
        
        return self._repository.delete(trademark_id)
    
    def get_trademark_by_brand_name(self, brand_name: str) -> Optional[Trademark]:
        if not brand_name.strip():
            raise ValueError("Brand name cannot be empty")
        
        return self._repository.get_by_brand_name(brand_name)