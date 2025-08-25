from abc import ABC, abstractmethod
from typing import List, Optional
from app.domain.models.trademark import Trademark, TrademarkCreate, TrademarkUpdate

class TrademarkRepositoryInterface(ABC):
    
    @abstractmethod
    def create(self, trademark: TrademarkCreate) -> Trademark:
        pass
    
    @abstractmethod
    def get_by_id(self, trademark_id: int) -> Optional[Trademark]:
        pass
    
    @abstractmethod
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Trademark]:
        pass
    
    @abstractmethod
    def update(self, trademark_id: int, trademark_update: TrademarkUpdate) -> Optional[Trademark]:
        pass
    
    @abstractmethod
    def delete(self, trademark_id: int) -> bool:
        pass
    
    @abstractmethod
    def get_by_brand_name(self, brand_name: str) -> Optional[Trademark]:
        pass